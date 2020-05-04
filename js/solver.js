const caoA = 0.3923;
const mgoA = 0.3577;
const caoB = 0.6863;
const mgoB = 0.0637;

const funcao_ca = 1.7867992;
const funcao_mg = 2.4832748;

const calcario = {
  A: {
    Ca: 29,
    Mg: 19,
    PRNT: 75,
    acrescimoCa: 0.517592,
    acrescimoMg: 0.471822,
    PN: 98.64,
  },
  B: {
    Ca: 45,
    Mg: 3,
    PRNT: 75,
    acrescimoCa: 0.80316,
    acrescimoMg: 0.074498,
    PN: 87.77,
  },
};

const input_funcao_ca = document.querySelector('input[name="funcao_ca"]');
const input_funcao_mg = document.querySelector('input[name="funcao_mg"]');

const input_cao_a = document.querySelector("input[name='cao_a']");
const input_cao_b = document.querySelector("input[name='cao_b']");
const input_mgo_a = document.querySelector("input[name='mgo_a']");
const input_mgo_b = document.querySelector("input[name='mgo_b']");

const input_ca_a = document.querySelector('input[name="ca_a"]');
const input_mg_a = document.querySelector('input[name="mg_a"]');
const input_prnt_a = document.querySelector('input[name="prnt_a"]');
const input_acrescimoCa_a = document.querySelector(
  'input[name="acrescimo_ca_a"]'
);
const input_acrescimoMg_a = document.querySelector(
  'input[name="acrescimo_mg_a"]'
);
const input_pn_a = document.querySelector('input[name="acrescimo_pn_a"]');

const input_ca_b = document.querySelector('input[name="ca_b"]');
const input_mg_b = document.querySelector('input[name="mg_b"]');
const input_prnt_b = document.querySelector('input[name="prnt_b"]');
const input_acrescimoCa_b = document.querySelector(
  'input[name="acrescimo_ca_b"]'
);
const input_acrescimoMg_b = document.querySelector(
  'input[name="acrescimo_mg_b"]'
);
const input_pn_b = document.querySelector('input[name="acrescimo_pn_b"]');

input_funcao_ca.value = funcao_ca;
input_funcao_mg.value = funcao_mg;

input_cao_a.value = caoA;
input_cao_b.value = caoB;

input_mgo_a.value = mgoA;
input_mgo_b.value = mgoB;

input_ca_a.value = calcario.A.Ca;
input_mg_a.value = calcario.A.Mg;
input_prnt_a.value = calcario.A.PRNT;
input_acrescimoCa_a.value = calcario.A.acrescimoCa;
input_acrescimoMg_a.value = calcario.A.acrescimoMg;
input_pn_a.value = calcario.A.PN;

input_ca_b.value = calcario.B.Ca;
input_mg_b.value = calcario.B.Mg;
input_prnt_b.value = calcario.B.PRNT;
input_acrescimoCa_b.value = calcario.B.acrescimoCa;
input_acrescimoMg_b.value = calcario.B.acrescimoMg;
input_pn_b.value = calcario.B.PN;
