const button_calcular = document.querySelector("button");
const load_file = document.querySelector("input#excel");

// Carrega todos os inputs da pagina
updateAll();

document.querySelectorAll("input").forEach((el) => {
  el.onchange = () => updateAll();
});
// _______________ Eventos ______________
button_calcular.onclick = () => {
  addSolverResults();
};

load_file.onchange = (e) => {
  const reader = new window.FileReader();

  reader.readAsArrayBuffer(e.target.files[0]);

  reader.onload = function (e) {
    const data = new window.Uint8Array(reader.result);

    const wb = window.XLSX.read(data, { type: "array" });

    var result = {};
    wb.SheetNames.forEach(function (sheetName) {
      var roa = window.XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
        header: 1,
      });
      if (roa.length) result[sheetName] = roa;
    });
    fillTable(result);
  };
};

// _______________ Funções ___________
function execSolve(delta_cao, delta_mgo) {
  const solver = window.solver;

  const cao_a = document.querySelector("input[name='cao_a']").value;
  const mgo_a = document.querySelector("input[name='mgo_a']").value;

  const cao_b = document.querySelector("input[name='cao_b']").value;
  const mgo_b = document.querySelector("input[name='mgo_b']").value;

  model = {
    optimize: { aplicar_a: "max", aplicar_b: "max" },
    opType: "max",
    constraints: {
      alvo_mgo: { equal: delta_mgo },
      alvo_cao: { equal: delta_cao },
    },
    variables: {
      aplicar_a: {
        aplicar_a: 1,
        alvo_cao: cao_a,
        alvo_mgo: mgo_a,
      },
      aplicar_b: {
        aplicar_b: 1,
        alvo_cao: cao_b,
        alvo_mgo: mgo_b,
      },
    },
  };
  const result = solver.Solve(model);

  const { feasible } = result.midpoint;
  let a = 0;
  let b = 0;
  // Se existir uma resposta ótima
  if (feasible) {
    a = result.midpoint.aplicar_a;
    b = result.midpoint.aplicar_b;
  } else {
    a = result.ranges.aplicar_a.min;
    b = result.ranges.aplicar_b.min;
  }

  return {
    feasible,
    a,
    b,
    alvo_cao: a * cao_a + b * cao_b,
    alvo_mgo: a * mgo_a + b * mgo_b,
  };
}

function updateAll() {
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
  const input_pn_a = document.querySelector('input[name="pn_a"]');

  const input_ca_b = document.querySelector('input[name="ca_b"]');
  const input_mg_b = document.querySelector('input[name="mg_b"]');
  const input_prnt_b = document.querySelector('input[name="prnt_b"]');
  const input_acrescimoCa_b = document.querySelector(
    'input[name="acrescimo_ca_b"]'
  );
  const input_acrescimoMg_b = document.querySelector(
    'input[name="acrescimo_mg_b"]'
  );
  const input_pn_b = document.querySelector('input[name="pn_b"]');
  const input_funcao_ca = document.querySelector("#funcao_ca");
  const input_funcao_mg = document.querySelector("#funcao_mg");

  const funcao_ca = parseFloat(input_funcao_ca.value) || 1.784799244;
  const funcao_mg = parseFloat(input_funcao_mg.value) || 2.483274779;
  const Ca_a = parseFloat(input_ca_a.value) || 0.29;
  const Mg_a = parseFloat(input_mg_a.value) || 0.19;
  const Ca_b = parseFloat(input_ca_b.value) || 0.45;
  const Mg_b = parseFloat(input_mg_b.value) || 0.03;

  const calcario = {
    A: {
      Ca: Ca_a,
      Mg: Mg_a,
      PRNT: 0.75,
      acrescimoCa: Ca_a * funcao_ca,
      acrescimoMg: Mg_a * funcao_mg,
      PN: 0.9864,
    },
    B: {
      Ca: Ca_b,
      Mg: Mg_b,
      PRNT: 0.75,
      acrescimoCa: Ca_b * funcao_ca,
      acrescimoMg: Mg_b * funcao_mg,
      PN: 0.8777,
    },
  };
  const cao_a = (calcario.A.PRNT / calcario.A.PN) * calcario.A.acrescimoCa;
  const mgo_a = (calcario.A.PRNT / calcario.A.PN) * calcario.A.acrescimoMg;
  const cao_b = (calcario.B.PRNT / calcario.B.PN) * calcario.B.acrescimoCa;
  const mgo_b = (calcario.B.PRNT / calcario.B.PN) * calcario.B.acrescimoMg;

  input_funcao_ca.value = funcao_ca;
  input_funcao_mg.value = funcao_mg;
  input_cao_a.value = cao_a.toFixed(2);
  input_cao_b.value = cao_b.toFixed(2);

  input_mgo_a.value = mgo_a.toFixed(2);
  input_mgo_b.value = mgo_b.toFixed(2);

  input_ca_a.value = calcario.A.Ca.toFixed(2);
  input_mg_a.value = calcario.A.Mg.toFixed(2);
  input_prnt_a.value = calcario.A.PRNT.toFixed(2);
  input_acrescimoCa_a.value = calcario.A.acrescimoCa.toFixed(2);
  input_acrescimoMg_a.value = calcario.A.acrescimoMg.toFixed(2);
  input_pn_a.value = calcario.A.PN.toFixed(2);

  input_ca_b.value = calcario.B.Ca.toFixed(2);
  input_mg_b.value = calcario.B.Mg.toFixed(2);
  input_prnt_b.value = calcario.B.PRNT.toFixed(2);
  input_acrescimoCa_b.value = calcario.B.acrescimoCa.toFixed(2);
  input_acrescimoMg_b.value = calcario.B.acrescimoMg.toFixed(2);
  input_pn_b.value = calcario.B.PN.toFixed(2);

  return { cao_a, mgo_a, cao_b, mgo_b };
}

function readXlsx() {}

function fillTable(data) {
  const tbody = document.querySelector("#tbody_calc");

  for (let i = 1; i < data.Planilha1.length; i++) {
    let row = tbody.insertRow(-1);

    console.log(data.Planilha1[i][0]);
    row.insertCell(0).innerHTML = `<b>${data.Planilha1[i][0]}</b>`;
    row.insertCell(1).innerHTML = data.Planilha1[i][1].toFixed(2);
    row.insertCell(2).innerHTML = data.Planilha1[i][2].toFixed(2);
  }
}

function addSolverResults() {
  const rows = document.querySelector("#tbody_calc").rows;

  for (row of rows) {
    const prnt_a = parseFloat(
      document.querySelector('input[name="prnt_a"]').value
    );
    const prnt_b = parseFloat(
      document.querySelector('input[name="prnt_b"]').value
    );
    const delta_cao = parseFloat(row.cells[1].innerHTML);
    const delta_mgo = parseFloat(row.cells[2].innerHTML);
    const { a, b, alvo_cao, alvo_mgo, feasible } = execSolve(
      delta_cao,
      delta_mgo
    );

    if (feasible) row.className += " feasible";

    if (row.cells[1].innerHTML == alvo_cao.toFixed(2))
      row.insertCell().innerHTML = `<b>${alvo_cao.toFixed(2)}</b>`;
    else row.insertCell().innerHTML = alvo_cao.toFixed(2);

    if (row.cells[2].innerHTML == alvo_mgo.toFixed(2))
      row.insertCell().innerHTML = `<b>${alvo_mgo.toFixed(2)}</b>`;
    else row.insertCell().innerHTML = alvo_mgo.toFixed(2);

    row.insertCell().innerHTML = `<b>${a.toFixed(4)}</b>`;
    row.insertCell().innerHTML = `<b>${b.toFixed(4)}</b>`;
    row.insertCell().innerHTML = ((a / prnt_a) * 1000).toFixed(0);
    row.insertCell().innerHTML = ((b / prnt_b) * 1000).toFixed(0);
  }
}
