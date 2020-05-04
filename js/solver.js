const caoA = 0.3923;
const mgA = 0.3577;
const caoB = 0.6863;
const mgoB = 0.0637;

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

const calcA_ca = document.querySelector('input[name="ca_a"]');
const calcA_mg = document.querySelector('input[name="mg_a"]');
const calcA_prnt = document.querySelector('input[name="prnt_a"]');
const calcA_acrescimoCa = document.querySelector(
  'input[name="acrescimo_ca_a"]'
);
const calcA_acrescimoMg = document.querySelector(
  'input[name="acrescimo_mg_a"]'
);
const calcA_pn = document.querySelector('input[name="acrescimo_pn_a"]');

const calcB_ca = document.querySelector('input[name="ca_b"]');
const calcB_mg = document.querySelector('input[name="mg_b"]');
const calcB_prnt = document.querySelector('input[name="prnt_b"]');
const calcB_acrescimoCa = document.querySelector(
  'input[name="acrescimo_ca_b"]'
);
const calcB_acrescimoMg = document.querySelector(
  'input[name="acrescimo_mg_b"]'
);
const calcB_pn = document.querySelector('input[name="acrescimo_pn_b"]');

calcA_ca.value = calcario.A.Ca;
calcA_mg.value = calcario.A.Mg;
calcA_prnt.value = calcario.A.PRNT;
calcA_acrescimoCa.value = calcario.A.acrescimoCa;
calcA_acrescimoMg.value = calcario.A.acrescimoMg;
calcA_pn.value = calcario.A.PN;

calcB_ca.value = calcario.B.Ca;
calcB_mg.value = calcario.B.Mg;
calcB_prnt.value = calcario.B.PRNT;
calcB_acrescimoCa.value = calcario.B.acrescimoCa;
calcB_acrescimoMg.value = calcario.B.acrescimoMg;
calcB_pn.value = calcario.B.PN;
