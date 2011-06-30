
#include <stdio.h>
#include <stdlib.h>

// tuning defines:
// increase CHI_CRITICAL to make more matches possible
// increase MIN_MATCHLEN to reduce no. of possible keys
#define CHI_CRITICAL 10 // 2: 10%, 4: 5%, 7: 2.5%, 10: 1%
#define MIN_MATCHLEN 7
// memory defines: adjust to prevent segfault and other memory errors
#define MAX_KEYSPACE 2000
#define MAX_ENGLISH 1000000
#define MAX_CIPHER  1000
#define MAX_PATTERN 1000

struct pair { int k, v; };
int pair_cmp (const void * a, const void * b) {
  return ((struct pair *)a)->v - ((struct pair *)b)->v;
}

int load_eng(char * filename, char * txt) {
  FILE * fp;
  int i, txt_size, index = 0;
  fp = fopen(filename, "r");
  if (fp == NULL) {
    printf("English text not found: %s\n", filename);
    exit(0);
  }
  txt_size = fread(txt, 1, MAX_ENGLISH, fp);
  fclose(fp);
  // process, trim, uppercase, collapse white spaces
  for (i = 0; i < txt_size; ) {
    for (; i < txt_size && (txt[i] < 'A' || txt[i] > 'Z') && (txt[i] < 'a' || txt[i] > 'z'); i++); // trim
    for (; i < txt_size; i++) {
      if (txt[i] >= 'A' && txt[i] <= 'Z') txt[index++] = txt[i]-'A';
      else if (txt[i] >= 'a' && txt[i] <= 'z') txt[index++] = txt[i]-'a';
      else {
	txt[index++] = -1;
	break;
      }
    }
  }
  if (index > 0 && txt[index-1] == -1) index--;
  txt_size = index;
  printf("Read english text: %i characters.\n", txt_size);
  return txt_size;
}
int load_cip(char * filename, char * txt) {
  FILE * fp;
  int i, txt_size, index = 0;
  fp = fopen(filename, "r");
  if (fp == NULL) {
    printf("Cipher text not found: %s\n", filename);
    exit(0);
  }  txt_size = fread(txt, 1, MAX_CIPHER, fp);
  fclose(fp);
  for (i = 0; i < txt_size; i++) {
    if (txt[i] >= 'A' && txt[i] <= 'Z') txt[index++] = txt[i]-'A';
    else if (txt[i] >= 'a' && txt[i] <= 'z') txt[index++] = txt[i]-'a';
  }
  txt_size = index;
  printf("Read cipher text: %i characters.\n", txt_size);
  return txt_size;
}
void load_stats(char * cip, int cip_size, int * eng_freq, int chi[][26]) {
  int i;
  int count[26];
  for (i = 0; i < 26; i++) count[i] = 0;
  for (i = 0; i < cip_size; i++) count[cip[i]]++;
  for (i = 0; i < 26; i++) {
    int j;
    struct pair sorter[26];
    for (j = 0; j < 26; j++) {
      long o1 = count[i];
      long e1 = eng_freq[j]*cip_size/1000;
      long o2 = cip_size-o1;
      long e2 = cip_size-e1;
      if (e1 == 0) e1 = 1;
      if (e2 == 0) e2 = 1;
      sorter[j].k = j;
      sorter[j].v = (o1-e1)*(o1-e1)/e1+(o2-e2)*(o2-e2)/e2;
    }
    qsort(sorter, 26, sizeof(struct pair), pair_cmp);
    chi[i][0] = 0;
    for (j = 0; j < 26; j++) {
      if (chi[i][0] < 1 || // list size min 1
	  sorter[j].v <= chi[i][chi[i][0]] || // element equal to previous element
	  sorter[j].v <= CHI_CRITICAL) { // chi square critical value ~1%
	chi[i][0]++;
	chi[i][chi[i][0]] = sorter[j].k;
      }
    }
    /* putchar('A'+i); */
    /* putchar(':'); */
    /* for (j = 1; j <= chi[i][0]; j++) putchar('A'+chi[i][j]); */
    /* putchar('\n'); */
  }
  /* exit(0); */
}

void solve(char * cip, int cip_size, char * eng, int eng_size, int chi[][26]) {
  int k;
  int nkeys[26];
  char * keys[26];
  for (k = 0; k < 26; k++) {
    keys[k] = malloc(sizeof(char)*MAX_KEYSPACE*26);
    if (keys[k] == NULL) {
      puts("Failed to allocate space for keys.");
      return;
    }
  }
  puts("Solving...");
  for (k = 0; k < 26; k++) nkeys[k] = 0;
  for (k = 0; k < cip_size; k++) { // < cip_size
    int i;
    char pattern[MAX_PATTERN];
    char match[2*MAX_PATTERN];
    char used[26];
    for (i = 0; i < 26; i++) used[i] = -1;
    for (i = 0; i < MAX_PATTERN && k+1 < cip_size; i++) {
      int c = cip[k+i];
      if (used[c] >= 0) pattern[i] = used[c];
      else {
	pattern[i] = -1;
	used[c] = i;
      }
    }
    // match the pattern:
    for (i = 0; i < eng_size; i++) {
      int j, n = 0;
      // skip spaces
      for (; eng[i] < 0 && i < eng_size; i++);
      // match pattern:
      for (j = 0; i+j < eng_size && n < MAX_PATTERN; ++j) {
	int c = eng[i+j];
	if (c >= 0) {
	  // not a space
	  if (pattern[n] >= 0) {
	    // match previous matched letter
	    if (c != match[pattern[n]]) {
	      // matching failed
	      break;
	    }
	    // match
	    match[n] = c;
	    n++;
	  } else {
	    // match incident letter
	    int m;
	    int cc = cip[k+n];
	    int ok = 0;
	    for (m = 1; m <= chi[cc][0]; m++) {
	      if (c == chi[cc][m]) {
		// incident letter matched
		int p;
		ok = 1;
		for (p = 0; p < n; p++) {
		  if (match[p] == c) {
		    // letter already matched
		    ok = 0;
		    break;
		  }
		}
		if (ok) {
		  match[n] = c;
		  n++;
		  break;
		}
	      }  
	    }
	    if (!ok) {
	      // match failed
	      break;
	    }
	  }
	  // matched
	  if (n >= MIN_MATCHLEN) {
	    // long enough sentence matched
	    if (i+j+1 >= eng_size || eng[i+j+1] < 0) {
	      // complete sentence matched
	      int m;
	      int key[26];
	      int keylen = -1;
	      for (m = 0; m < 26; m++) key[m] = -1;
	      for (m = 0; m < n; m++) {
		if (key[cip[k+m]] < 0) {
		  key[cip[k+m]] = match[m];
		  keylen++;
		}
	      }
	      // enough space?
	      if (nkeys[keylen] >= MAX_KEYSPACE) continue;
	      // key already known?
	      int keyfound = 0;
	      for (m = nkeys[keylen]-1; m >= 0; m--) {
		int p;
		char * ekey = keys[keylen]+26*m;
		for (p = 0; p < 26 && ekey[p] == key[p]; p++);
		if (p >= 26) {
		  // match
		  keyfound = 1;
		  break;
		}
	      }
	      if (!keyfound) {
		// add key
		char * ekey = keys[keylen]+26*nkeys[keylen];
		for (m = 0; m < 26; m++) ekey[m] = key[m];
		nkeys[keylen]++;
		if (nkeys[keylen] >= MAX_KEYSPACE) {
		  puts("Key candidates lost. Consider increasing MAX_KEYSPACE!");
		}
		//printf("New key, offset: %i, keylen: %i, textlen: %i\n", i, keylen, n);
	      }
	    }
	  }
	}
      }
      // match failed, scan to next word:
      for (; eng[i] >= 0 && i < eng_size; i++);
    }
  }
  int totalkeys = 0;
  for (k = 0; k < 26; k++) totalkeys += nkeys[k];
  if (totalkeys > 0) {
    printf("Found %i partial keys\n", totalkeys);
    puts("Combining keys...");
    // create inverse keys
    int nnewkeys = 0;
    char * keysinv[26];
    for (k = 0; k < 26; k++) {
      keysinv[k] = malloc(sizeof(char)*MAX_KEYSPACE*26);
      if (keysinv[k] == NULL) {
	puts("Failed to allocate space for inverse keys.");
	return;
      }
      int i;
      for(i = 0; i < nkeys[k]; i++) {
	int j;
	for (j = 0; j < 26; j++) keysinv[k][i*26+j] = -1;
	for (j = 0; j < 26; j++) if (keys[k][i*26+j] >= 0) keysinv[k][i*26+keys[k][i*26+j]] = j;
      }
    }
    // combine keys
    for (k = 0; k < 26; k++) {
      int i;
      for (i = 0; i < nkeys[k]; i++) {
	int j;
	char * keya = keys[k]+26*i;
	for (j = 0; j <= k; j++) {
	  // test against all keys smaller or same size
	  int m;
	  for (m = 0; m < nkeys[j]; m++) {
	    char * keyb = keys[j]+26*m;
	    char newkey[26];
	    int keylen = -1;
	    int q;
	    int intersecting = 0;
	    for (q = 0; q < 26; q++) {
	      char ka = keya[q];
	      char kb = keyb[q];
	      if (ka == kb) {
		newkey[q] = ka;
		intersecting = 1;
	      } else {
		if (ka < 0) {
		  if (keysinv[k][i*26+kb] < 0) newkey[q] = kb;
		  else break; // letter cannot be reused
		} else if (kb < 0) {
		  if (keysinv[j][m*26+ka] < 0) newkey[q] = ka;
		  else break;
		} else break; // ka != kb
	      }
	      if (ka+kb >= -1) keylen++; // keysize increased
	    }
	    if (q >= 26 && intersecting > 0 && nkeys[keylen] < MAX_KEYSPACE) {
	      // new key constructed
	      int r;
	      int keyexists = 0;
	      for (r = nkeys[keylen]-1; r >= 0; r--) {
		int s;
		for (s = 0; s < 26; s++) if (keys[keylen][r*26+s] != newkey[s]) break;
		if (s >= 26) {
		  keyexists = 1;
		  break;
		}
	      }
	      if (!keyexists) {
		int s;
		for (s = 0; s < 26; s++) keys[keylen][26*nkeys[keylen]+s] = newkey[s];
		for (s = 0; s < 26; s++) keysinv[keylen][26*nkeys[keylen]+s] = -1;
		for (s = 0; s < 26; s++) if (newkey[s] >= 0) keysinv[keylen][26*nkeys[keylen]+newkey[s]] = s;
		nkeys[keylen]++;
		nnewkeys++;
		if (nkeys[keylen] >= MAX_KEYSPACE) {
		  puts("Key candidates lost. Consider increasing MAX_KEYSPACE!");
		}
	      }
	    }
	  }
	}
      }
    }
    totalkeys += nnewkeys;
    for (k = 0; k < 26; k++) free(keysinv[k]);
    printf("Totally %i (partial) keys found:\n", totalkeys);
    for (k = 26-1; k >= 0; k--) {
      int i;
      for (i = 0; i < nkeys[k]; i++) {
	int j;
	printf("Key candidate (size %i):\n",k+1);
	for (j = 0; j < 26; j++) putchar('A'+j); putchar('\n');
	for (j = 0; j < 26; j++) {
	  int c = keys[k][i*26+j];
	  putchar(c < 0 ? '-' : 'A'+c);
	}
	putchar('\n');
	// print sample
	puts("Sample plain text:");
	for (j = 0; j < cip_size && j < 500; j++) {
	  int c = keys[k][i*26+cip[j]];
	  putchar(c < 0 ? '-' : 'A'+c);
	}
	putchar('\n');
	puts("-------------------------");
	puts("Hit enter to show next key candidate");
	getchar();
      }
    }
    puts("No more key candidates");
  }
  for (k = 0; k < 26; k++) free(keys[k]);
}

int main (int argc, char *argv[]) {

  int i;
  char * eng, * cip;
  int eng_size, cip_size;
  int chi[26][26];
  int eng_freq[] = {82, 15, 28, 43, 127, 22, 20, 61, 70, 2, 8, 40, 24, 67, 75, 19, 1, 60, 63, 91, 28, 10, 23, 1, 20, 1};

  // welcome
  puts("Pattern matcher tool");
  if (argc < 3) {
    puts("Usage: break english.txt cipher.txt");
    return 0;
  }

  // load texts
  eng = malloc(sizeof(char)*MAX_ENGLISH);
  cip = malloc(sizeof(char)*MAX_CIPHER);
  if (eng == NULL || cip == NULL) {
    puts("Failed to allocate memory for english and/or cipher text");
    return 0;
  }

  eng_size = load_eng(argv[1], eng);
  cip_size = load_cip(argv[2], cip);

  load_stats(cip, cip_size, eng_freq, chi);

  solve(cip, cip_size, eng, eng_size, chi);

  free(eng);
  free(cip);

  return 0;
}
