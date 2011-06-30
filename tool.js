
var transforms = {
    letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
};

var elements = {
    ciphertext: null,
    plaintext: null,
    letters: [],
    frequencies: [],
};

var stats = {
    ciphertext: '',
    letters: [],
    digrams: [],
    trigrams: [],
    english: {
	letters: [.082, .015, .028, .043, .127, .022, .020, .061, .070, .002, .008, .040, .024, .067, .075, .019, .001, .060, .063, .091, .028, .010, .023, .001, .020, .001],
	digrams: {'TH':0.0320,'HE':0.0267,'IN':0.0170,'ER':0.0167,'AN':0.0149,'HA':0.0141,'RE':0.0137,'OU':0.0133,'ES':0.0127,'AT':0.0121,'ED':0.0117,'ON':0.0116,'ND':0.0113,'ST':0.0110,'EN':0.0110,'NT':0.0106,'HI':0.0102,'EA':0.0100,'IS':0.0099,'TO':0.0099,'AS':0.0095,'IT':0.0095,'TI':0.0086,'ET':0.0086,'OR':0.0083,'ME':0.0080,'AR':0.0079,'TE':0.0077,'VE':0.0076,'SE':0.0073,'NG':0.0071,'LE':0.0069,'OF':0.0069,'HO':0.0064,'NO':0.0064,'RO':0.0064,'SA':0.0061,'WA':0.0061,'NE':0.0060,'SI':0.0058,'TA':0.0058,'TT':0.0057,'YO':0.0057,'LL':0.0056,'SO':0.0055,'DE':0.0055,'AL':0.0054,'RA':0.0053,'EL':0.0052,'UR':0.0052,'OT':0.0052,'EW':0.0051,'OM':0.0051,'RI':0.0051,'SH':0.0051,'EE':0.0049,'WH':0.0048,'MA':0.0048,'AD':0.0048,'EC':0.0047,'DI':0.0047,'CO':0.0046,'DT':0.0046,'SS':0.0045,'BE':0.0045,'EM':0.0045,'DO':0.0044,'OW':0.0044,'IC':0.0044,'EI':0.0043,'UT':0.0043,'WI':0.0043,'CE':0.0042,'WE':0.0042,'US':0.0042,'RT':0.0041,'CH':0.0040,'OL':0.0040,'DA':0.0040,'LA':0.0039,'FO':0.0038,'LI':0.0038,'AC':0.0038,'NI':0.0037,'AI':0.0037,'OO':0.0036,'EH':0.0036,'RS':0.0036,'NA':0.0035,'ID':0.0035,'LO':0.0035,'LD':0.0034,'LY':0.0034,'UL':0.0033,'CA':0.0033,'NS':0.0032,'TS':0.0032,'PE':0.0032,'EO':0.0032,'UN':0.0032,'TW':0.0031,'IL':0.0031,'TR':0.0031,'EF':0.0031,'FT':0.0030,'AM':0.0030,'AV':0.0029,'PO':0.0029,'IM':0.0029,'DH':0.0028,'IO':0.0028,'EP':0.0028,'OS':0.0027,'NC':0.0027,'GH':0.0026,'KE':0.0026,'GE':0.0026,'MO':0.0026,'HT':0.0025,'WO':0.0025,'DS':0.0025,'MI':0.0024,'IR':0.0024,'SW':0.0024,'FA':0.0023,'EY':0.0023,'EB':0.0022,'RD':0.0022,'AY':0.0022,'FI':0.0022,'RY':0.0022,'PR':0.0022,'BL':0.0021,'AB':0.0021,'EV':0.0021,'SU':0.0021,'MY':0.0021,'PA':0.0021,'IG':0.0021,'BU':0.0020,'CT':0.0020,'FR':0.0020,'LM':0.0019,'IE':0.0019,'AP':0.0019,'NH':0.0018,'FE':0.0018,'TU':0.0018,'GA':0.0018,'SC':0.0018,'UP':0.0018,'CK':0.0017,'AG':0.0017,'SP':0.0017,'TL':0.0017,'YT':0.0017,'IF':0.0017,'OD':0.0016,'GO':0.0016,'RH':0.0016,'RN':0.0016,'DB':0.0016,'YE':0.0015,'DW':0.0015,'OP':0.0015,'YS':0.0015,'SM':0.0015,'TY':0.0015,'YA':0.0014,'RM':0.0014,'OC':0.0014,'NW':0.0013,'DR':0.0013,'RW':0.0013,'IA':0.0013,'IV':0.0013,'DY':0.0013,'NY':0.0013,'OA':0.0013,'TM':0.0013,'LT':0.0013,'PL':0.0013,'RR':0.0013,'EX':0.0012,'UC':0.0012,'BO':0.0012,'CR':0.0012,'EG':0.0012,'GR':0.0012,'GT':0.0012,'GI':0.0012,'MP':0.0012,'WN':0.0012,'NL':0.0011,'DM':0.0011,'UG':0.0011,'YI':0.0011,'AK':0.0011,'AW':0.0011,'SB':0.0011,'VI':0.0011,'CL':0.0011,'OV':0.0011,'OK':0.0011,'OB':0.0011,'DL':0.0011,'RL':0.0011,'SF':0.0010,'OI':0.0010,'DN':0.0010,'SN':0.0010,'DU':0.0010,'KI':0.0010,'PP':0.0010,'RU':0.0010,'YH':0.0010,'BA':0.0010,'SL':0.0010,'TC':0.0010,'TB':0.0009,'KN':0.0009,'IH':0.0009,'LS':0.0009,'CI':0.0009,'DF':0.0009,'RK':0.0009,'AF':0.0009,'CU':0.0009,'MR':0.0009,'RC':0.0009,'DD':0.0009,'MU':0.0009,'NF':0.0009,'YW':0.0009,'OH':0.0009,'UA':0.0008,'BR':0.0008,'MT':0.0008,'BY':0.0008,'FF':0.0008,'RG':0.0008,'GL':0.0008,'UM':0.0008,'MS':0.0008,'LU':0.0008,'QU':0.0008,'PI':0.0008,'LF':0.0007,'HR':0.0007,'TF':0.0007,'NM':0.0007,'IW':0.0007,'UI':0.0007,'GU':0.0007,'NN':0.0007,'NB':0.0007,'UE':0.0007,'NK':0.0007,'PT':0.0007,'FU':0.0007},
	trigrams: {'THE':0.0185,'AND':0.0074,'THA':0.0060,'ING':0.0054,'HAT':0.0054,'HER':0.0049,'YOU':0.0048,'HIS':0.0045,'ERE':0.0042,'WAS':0.0038,'NTH':0.0037,'THI':0.0036,'ENT':0.0034,'ETH':0.0033,'TTH':0.0031,'DTH':0.0030,'ITH':0.0029,'FOR':0.0029,'INT':0.0029,'VER':0.0026,'AVE':0.0026,'EST':0.0026,'TER':0.0025,'OUR':0.0024,'OTH':0.0024,'ATI':0.0023,'WIT':0.0023,'FTH':0.0023,'ION':0.0023,'NOT':0.0023,'EAR':0.0022,'OFT':0.0022,'OUL':0.0022,'HES':0.0022,'HAD':0.0021,'MES':0.0021,'ULD':0.0021,'STH':0.0021,'ALL':0.0021,'EDT':0.0021,'ONT':0.0021,'HAV':0.0020,'REA':0.0020,'SHE':0.0019,'ATT':0.0019,'ONE':0.0019,'ESS':0.0019,'HOL':0.0018,'OME':0.0018,'RES':0.0018,'MAN':0.0018,'WHI':0.0018,'STA':0.0018,'AST':0.0018,'GHT':0.0018,'TIO':0.0017,'OUT':0.0017,'ERS':0.0017,'HIN':0.0017,'ARE':0.0017,'HEW':0.0016,'LME':0.0016,'EVE':0.0016,'NCE':0.0016,'RTH':0.0016,'HED':0.0016,'HEN':0.0016,'EAN':0.0016,'EWA':0.0016,'HOU':0.0015,'NDT':0.0015,'ERT':0.0015,'OLM':0.0015,'HIC':0.0015,'HEM':0.0015,'ICH':0.0015,'EHA':0.0015,'ETO':0.0015,'EEN':0.0015,'TIN':0.0015,'OUS':0.0015,'EDI':0.0015,'OUN':0.0014,'BUT':0.0014,'TAN':0.0014,'EOF':0.0014,'EDA':0.0014,'HEC':0.0014,'ATH':0.0014,'HEA':0.0014,'STO':0.0014,'SIN':0.0014,'ELL':0.0014,'NTO':0.0014,'AIN':0.0014,'ATE':0.0014,'IGH':0.0013,'TED':0.0013,'RED':0.0013,'BLE':0.0013,'STR':0.0013,'NIN':0.0013,'RAN':0.0013,'EIN':0.0013,'DIN':0.0013,'NDI':0.0013,'ILL':0.0013,'ORE':0.0013,'HAN':0.0013,'ITI':0.0013,'SON':0.0013,'IST':0.0013,'HEH':0.0012,'SAN':0.0012,'RET':0.0012,'ECO':0.0012,'TOT':0.0012,'EMA':0.0012,'AID':0.0012,'FRO':0.0012,'ORT':0.0012,'UND':0.0012,'SHO':0.0012,'HIM':0.0012,'UST':0.0012,'ESA':0.0012,'COU':0.0012,'CON':0.0011,'IND':0.0011,'IDE':0.0011,'HEP':0.0011,'DTO':0.0011,'ROM':0.0011,'YTH':0.0011,'ERY':0.0011,'ERA':0.0011,'IVE':0.0011,'ANT':0.0011,'SOF':0.0011,'NGT':0.0011,'TWA':0.0011,'ENO':0.0011,'ECT':0.0011,'ITW':0.0011,'WER':0.0011,'WHE':0.0011,'NED':0.0011,'ISH':0.0011,'EFO':0.0011,'NDO':0.0011,'NOW':0.0011,'TIS':0.0011,'ESE':0.0010,'DON':0.0010,'THO':0.0010,'TRA':0.0010,'URE':0.0010,'DER':0.0010,'INS':0.0010,'OWN':0.0010,'TTE':0.0010,'TOF':0.0010,'ERO':0.0010,'STE':0.0010,'DHE':0.0010,'SAI':0.0010,'AME':0.0010,'EDO':0.0010,'INE':0.0010,'EAT':0.0010,'ESI':0.0010,'OVE':0.0010,'SHA':0.0010,'PRO':0.0010,'ASS':0.0010,'DAN':0.0010,'MEN':0.0010,'HEL':0.0010,'ABL':0.0010,'ARD':0.0010,'LEA':0.0010,'PER':0.0010,'COM':0.0010,'LET':0.0010,'ISA':0.0010,'PON':0.0009,'NDS':0.0009,'HET':0.0009,'ART':0.0009,'NDE':0.0009,'EWH':0.0009,'MET':0.0009,'INA':0.0009,'ASA':0.0009,'ERI':0.0009,'VEN':0.0009,'NTE':0.0009,'STI':0.0009,'TON':0.0009,'ROU':0.0009,'EAD':0.0009,'SEE':0.0009,'RIN':0.0009,'ATS':0.0009,'CHA':0.0009,'WHO':0.0009,'SOM':0.0009,'ESH':0.0009,'SSI':0.0009,'USE':0.0009,'EAS':0.0009,'MOR':0.0009,'ONS':0.0009,'UGH':0.0009,'HEB':0.0009,'SIT':0.0009,'ACE':0.0009,'TIT':0.0009,'WOU':0.0009,'WIL':0.0009,'EHE':0.0008,'EME':0.0008,'END':0.0008,'NDA':0.0008,'TUR':0.0008,'HEF':0.0008,'HTH':0.0008,'UPO':0.0008,'BEE':0.0008,'IHA':0.0008,'MIN':0.0008,'EYO':0.0008,'NTI':0.0008,'TEN':0.0008,'HEI':0.0008,'DEN':0.0008,'OSE':0.0008,'AKE':0.0008,'ESO':0.0008,'ANY':0.0008,'CAN':0.0008,'LES':0.0008,'OUG':0.0008,'TSO':0.0008,'DIT':0.0008,'NAN':0.0008,'ITT':0.0008,'REE':0.0008,'DNO':0.0008,'EAL':0.0008,'TYO':0.0008,'EIS':0.0008,'ENI':0.0008,'EDH':0.0008,'ECA':0.0008,'DBE':0.0008,'ENE':0.0008,'ONA':0.0008,'WHA':0.0008,'DOW':0.0007},
    },
};
// the key:
var substitutions = {};

function html_add_change_event(elm, evt) {
    elm.addEventListener('change', evt);
    elm.addEventListener('keyup', evt);
    elm.addEventListener('mouseup', evt);
}
function html_clear_float(elm) {
    var clear = document.createElement('div');
    clear.className = 'clear';
    clear.innerHTML = '&nbsp;';
    elm.appendChild(clear);
}

function render_plaintext() {
    var plaintext = elements.ciphertext.value.toUpperCase().split('');
    substitutions = {};
    for (var i = 0; i < 26; i++) {
	var c = elements.letters[i].value.toUpperCase();
	if (c.length == 1 && c.charCodeAt(0) >= 65 && c.charCodeAt(0) < 65+26) {
	    substitutions[String.fromCharCode(65+i)] = c;
	} else c = '';
	if (elements.letters[i].value != c) elements.letters[i].value = c;
    }
    for (var i = 0; i < plaintext.length; i++) {
	if (plaintext[i].charCodeAt(0) >= 65 && plaintext[i].charCodeAt(0) < 65+26) plaintext[i] = substitutions[plaintext[i]] || '-';
    }
    elements.plaintext.value = plaintext.join('');
}

function make_cipher_statistics() {
    // init stats
    stats.ciphertext = elements.ciphertext.value.toUpperCase().replace(/[^a-z\s]/gi, '');
    stats.letters = [];
    for (var i = 0; i < 26; i++) stats.letters[i] = 0;
    stats.digrams = {};
    stats.trigrams = {};
    // make stats for letter frequencies
    var letters = stats.ciphertext.match(/[a-z]/gi);
    var ndigrams = 0, ntrigrams = 0, sorter;
    if (letters != null) {
	for (var i = 0; i < letters.length; i++) {
	    stats.letters[letters[i].charCodeAt(0)-65]++;
	    if (i+1 < letters.length) {
		var digram = letters[i]+letters[i+1];
		if (!stats.digrams[digram]) stats.digrams[digram] = 0;
		stats.digrams[digram]++;
		ndigrams++;
	    }
	    if (i+2 < letters.length) {
		var trigram = letters[i]+letters[i+1]+letters[i+2];
		if (!stats.trigrams[trigram]) stats.trigrams[trigram] = 0;
		stats.trigrams[trigram]++;
		ntrigrams++;
	    }
	}
	// update letters
	for (var i = 0; i < 26; i++) {
	    if (stats.letters[i] > 0) {
		elements.frequencies[i].innerHTML = (stats.letters[i]/letters.length).toString().substring(0, 5);
	    } else {
		elements.frequencies[i].innerHTML = '';
	    }
	}
	// update digrams
	sorter = [];
	for ( var e in stats.digrams) sorter.push([e, stats.digrams[e]]);
	sorter.sort(function(a,b) { return b[1]-a[1] || a[0]>b[0] });
	elements.digrams.innerHTML = '';
	for (var i = 0; i < Math.min(260,sorter.length); i++) {
	    var di = document.createElement('div');
	    di.className = 'igram';
	    di.innerHTML = '<div class="gram">'+sorter[i][0]+'</div><div class="freq">'+
		(sorter[i][1]/ndigrams).toString().substring(0, 5)+'</div>';
	    elements.digrams.appendChild(di);
	}
	// update trigrams
	sorter = [];
	for ( var e in stats.trigrams) sorter.push([e, stats.trigrams[e]]);
	sorter.sort(function(a,b) { return b[1]-a[1] || a[0]>b[0] });
	elements.trigrams.innerHTML = '';
	for (var i = 0; i < Math.min(260,sorter.length); i++) {
	    var di = document.createElement('div');
	    di.className = 'igram';
	    di.innerHTML = '<div class="gram">'+sorter[i][0]+'</div><div class="freq">'+
		(sorter[i][1]/ntrigrams).toString().substring(0, 5)+'</div>';
	    elements.trigrams.appendChild(di);
	}
    } else {
	for (var i = 0; i < 26; i++) elements.frequencies[i].innerHTML = '';
    }
    if (!ndigrams) elements.digrams.innerHTML = '<p>No digrams found in the ciphertext.</p>';
    if (!ntrigrams) elements.trigrams.innerHTML = '<p>No trigrams found in the ciphertext.</p>';
    // make chi square goodness of fit tests
    if (letters != null) {
	var printed;
	var chistats = "";
	var substitutionsinv = {};
	for (var e in substitutions) substitutionsinv[substitutions[e]] = e;
	// letters
	chistats += "<ol type=A>";
	for (var j = 0; j < 26; j++) {
	    var matches = 0;
	    chistats += "<li>";
	    chisort = [];
	    if (!substitutionsinv[String.fromCharCode(65+j)]) {
		for (var i = 0; i < 26; i++) if (stats.letters[i] > 0 && !substitutions[String.fromCharCode(65+i)]) {
		    var chitest = Math.pow(stats.letters[i]-stats.english.letters[j]*letters.length, 2)/(stats.english.letters[j]*letters.length) + Math.pow((letters.length-stats.letters[i])-(1-stats.english.letters[j])*letters.length,2)/((1-stats.english.letters[j])*letters.length);
		    if (chitest <= 7) {
			// Chi table: 2.706: 10%, 3.841: 5%, 0.
			// possible match
			matches++;
			chisort.push([String.fromCharCode(i+65), chitest]);
		    }
		}
		if (matches) {
		    chisort.sort(function(a,b) { return a[1]-b[1] || a[0]>b[0] });
		    console.log(chisort);
		    for (var i = 0; i < chisort.length; i++) {
			if (i) chistats += ", ";
			chistats += chisort[i][0]+" ("+chisort[i][1].toString().substring(0,4)+")";
		    }
		}
	    }
	    chistats += "</li>";
	}
	chistats += "</ol>";	

	// digrams
	chistats += "<ol>";
	sorter = [];
	for (var e in stats.digrams) sorter.push([e, stats.digrams[e]]);
	sorter.sort(function(a,b) { return b[1]-a[1] || a[0]>b[0] });
	printed = 0;
	for (var f in stats.english.digrams) {
	    if (substitutionsinv[f.charAt(0)] && substitutionsinv[f.charAt(1)]) continue;
	    var matches = 0;
	    chisort = [];
	    for (var i = 0; i < sorter.length; i++) {
		if (substitutionsinv[f.charAt(0)]) {
		    if (substitutionsinv[f.charAt(0)] != sorter[i][0].charAt(0)) continue;
		} else {
		    if (substitutions[sorter[i][0].charAt(0)]) continue;
		}
		if (substitutionsinv[f.charAt(1)]) {
		    if (substitutionsinv[f.charAt(1)] != sorter[i][0].charAt(1)) continue;
		} else {
		    if (substitutions[sorter[i][0].charAt(1)]) continue;
		}
		var chio1 = sorter[i][1];
		var chie1 = stats.english.digrams[f]*ndigrams;
		var chio2 = ndigrams-sorter[i][1];
		var chie2 = (1-stats.english.digrams[f])*ndigrams;
		var chitest = Math.pow(chio1-chie1, 2)/chie1 + Math.pow(chio2-chie2,2)/chie2;
		if (chitest <= 7) {
		    // Chi table: 2.706: 10%, 3.841: 5%, 0.
		    // possible match
		    matches++;
		    chisort.push([sorter[i][0], chitest]);
		}
	    }
	    if (matches) {
		chistats += "<li>";
		chisort.sort(function(a,b) { return a[1]-b[1] || a[0]>b[0] });
		chistats += f+": ";
		for (var j = 0; j < chisort.length && j < 10; j++) {
		    if (j) chistats += ", ";
		    chistats += chisort[j][0]+" ("+chisort[j][1].toString().substring(0,4)+")";
		}
		chistats += "</li>";
		printed++;
		if (printed >= 20) break;
	    }
	}
	chistats += "</ol>";

	// trigrams
	chistats += "<ol>";
	sorter = [];
	for (var e in stats.trigrams) sorter.push([e, stats.trigrams[e]]);
	sorter.sort(function(a,b) { return b[1]-a[1] || a[0]>b[0] });
	printed = 0;
	for (var f in stats.english.trigrams) {
	    if (substitutionsinv[f.charAt(0)] && substitutionsinv[f.charAt(1)] && substitutionsinv[f.charAt(2)]) continue;
	    var matches = 0;
	    chisort = [];
	    for (var i = 0; i < sorter.length; i++) {
		if (substitutionsinv[f.charAt(0)]) {
		    if (substitutionsinv[f.charAt(0)] != sorter[i][0].charAt(0)) continue;
		} else {
		    if (substitutions[sorter[i][0].charAt(0)]) continue;
		}
		if (substitutionsinv[f.charAt(1)]) {
		    if (substitutionsinv[f.charAt(1)] != sorter[i][0].charAt(1)) continue;
		} else {
		    if (substitutions[sorter[i][0].charAt(1)]) continue;
		}
		if (substitutionsinv[f.charAt(2)]) {
		    if (substitutionsinv[f.charAt(2)] != sorter[i][0].charAt(2)) continue;
		} else {
		    if (substitutions[sorter[i][0].charAt(2)]) continue;
		}
		var chio1 = sorter[i][1];
		var chie1 = stats.english.trigrams[f]*ntrigrams;
		var chio2 = ntrigrams-sorter[i][1];
		var chie2 = (1-stats.english.trigrams[f])*ntrigrams;
		var chitest = Math.pow(chio1-chie1, 2)/chie1 + Math.pow(chio2-chie2,2)/chie2;
		if (chitest <= 7) {
		    // Chi table: 2.706: 10%, 3.841: 5%, 0.
		    // possible match
		    matches++;
		    chisort.push([sorter[i][0], chitest]);
		}
	    }
	    if (matches) {
		chistats += "<li>";
		chisort.sort(function(a,b) { return a[1]-b[1] || a[0]>b[0] });
		chistats += f+": ";
		for (var j = 0; j < chisort.length && j < 10; j++) {
		    if (j) chistats += ", ";
		    chistats += chisort[j][0]+" ("+chisort[j][1].toString().substring(0,4)+")";
		}
		chistats += "</li>";
		printed++;
		if (printed >= 20) break;
	    }
	}
	chistats += "</ol>";

	// show
	elements.chisquare.innerHTML = chistats;
    } else elements.chisquare.innerHTML = '<p>No ciphertext found.</p>';

    render_plaintext();
}

function tool_init() {
    var h2;
    //build GUI
    var h1 = document.createElement("h1");
    h1.innerHTML = 'Simple substitution cipher analysis tool';
    document.body.appendChild(h1);
    // statistics
    var boxstats = document.createElement('div');
    h2 = document.createElement('h2');
    h2.innerHTML = 'Letter frequencies and key/substitutions';
    boxstats.appendChild(h2);
    elements.letters = [];
    elements.frequencies = [];
    for (var i = 0; i < 26; i++) {
	var e, letter = document.createElement('div');
	letter.className = 'letter';
	letter.innerHTML = '';
	e = document.createElement('div');
	e.className = 'subletr';
	var input = document.createElement('input');
	input.placeholder = transforms.letters[i];
	input.maxLength = 1;
	elements.letters.push(input);
	html_add_change_event(input, function() {
	    render_plaintext();
	    make_cipher_statistics();
	});
	e.appendChild(input);
	letter.appendChild(e);
	e = document.createElement('div');
	e.className = 'orgletr';
	e.innerHTML = transforms.letters[i];
	letter.appendChild(e);
	e = document.createElement('div');
	e.className = 'engfreq';
	e.innerHTML = stats.english.letters[i];
	letter.appendChild(e);
	e = document.createElement('div');
	e.className = 'orgfreq';
	elements.frequencies.push(e);
	letter.appendChild(e);
	boxstats.appendChild(letter);
    }
    html_clear_float(boxstats);
    document.body.appendChild(boxstats);
    // cipher text box
    h2 = document.createElement('h2');
    h2.innerHTML = 'Cipher- and plaintext';
    boxstats.appendChild(h2);
    var boxcipher = document.createElement('div');
    boxcipher.id = 'boxcipher';
    elements.ciphertext = document.createElement('textarea');
    elements.ciphertext.placeholder = 'Enter ciphertext here';
    elements.ciphertext.value = "DGWZB BUDRB IMTIS ZGCPB LMGLL BRPVZ SBZSS WABVC\nSPBMI JNICR ABOIC SGXBJ SWMBT VSPSP BIVMG HILMG\nHBZZG MIRRM BZZVC OPVZJ XIZZV SVZCG SMBIX XDRVH\nHVJWX SSGJG CZSMW JSIZB MVBZG HVCHB MBCJB ZBIJP\nRBLBC RBCSW LGCVS ZLMBR BJBZZ GMICR BIJPZ VULXB\nVCVSZ BXHVH IHSBM RGVCO ZGGCB ZVULX DNCGJ NZGWS\nIXXSP BJBCS MIXVC HBMBC JBZIC RLMBZ BCSZG CBZIW\nRVBCJ BTVSP SPBZS IMSVC OLGVC SICRS PBJGC JXWZV\nGCGCB UIDLM GRWJB IZSIM SXVCO SPGWO PLGZZ VAXDI\n             UBMBS MVJVG WZBHH BJS\n";
    html_add_change_event(elements.ciphertext, make_cipher_statistics);
    boxcipher.appendChild(elements.ciphertext);
    document.body.appendChild(boxcipher);
    // plain text box
    var boxplain = document.createElement('div');
    boxplain.id = 'boxplain';
    elements.plaintext = document.createElement('textarea');
    elements.plaintext.placeholder = 'Plaintext will show here';
    elements.plaintext.readOnly = true;
    boxplain.appendChild(elements.plaintext);
    document.body.appendChild(boxplain);
    html_clear_float(document.body);
    // attach scroll events
    elements.ciphertext.addEventListener('scroll', function() {
	elements.plaintext.scrollTop = this.scrollTop;
    });
    elements.plaintext.addEventListener('scroll', function() {
	elements.ciphertext.scrollTop = this.scrollTop;
    });
    // goodness of fit
    h2 = document.createElement('h2');
    h2.innerHTML = 'Chi square text (5% significance level), plain text letter may correspond to:';
    document.body.appendChild(h2);
    var chisquare = document.createElement('div');
    document.body.appendChild(chisquare);
    elements.chisquare = chisquare;
    html_clear_float(document.body);
    // digrams
    h2 = document.createElement('h2');
    h2.innerHTML = 'Digrams statistics in ciphertext';
    document.body.appendChild(h2);
    var boxdigrams = document.createElement('div');
    document.body.appendChild(boxdigrams);
    elements.digrams = boxdigrams;
    html_clear_float(document.body);
    // trigrams
    h2 = document.createElement('h2');
    h2.innerHTML = 'Trigrams statistics in ciphertext';
    document.body.appendChild(h2);
    var boxtrigrams = document.createElement('div');
    document.body.appendChild(boxtrigrams);
    elements.trigrams = boxtrigrams;
    html_clear_float(document.body);
    // footer
    var footer = document.createElement('div');
    footer.id = 'footer';
    footer.innerHTML = '&copy; 2010 Theis Mackeprang';
    document.body.appendChild(footer);

    make_cipher_statistics();
}


tool_init();
