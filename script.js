const PROJETOS = [
  {
    nome: "Projeto 1",
    url: "https://oufiieqxyyqnqpcbuyms.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZmlpZXF4eXlxbnFwY2J1eW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDMwNDgsImV4cCI6MjA3NDkxOTA0OH0.-4QPA1R5y24daAt-WsZuWc8-2bJxCJGhdTR1nq4RnHc"
  },
  {
    nome: "Projeto 2",
    url: "https://lfhgyyhzvhmdphgbvblc.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmaGd5eWh6dmhtZHBoZ2J2YmxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MzEzOTYsImV4cCI6MjA3NTUwNzM5Nn0.ZAcoIbeOQFIo01qW_rcKIkJKvneqgeN6rpPSCFvTe1Y"
  }
];

const EMAIL = "simulacao@teste.com";
const PASSWORD = "12345678";

const output = document.getElementById("output");

function log(msg) {
  output.innerText += msg + "\n";
}

async function simularProjeto(projeto) {
  log(`\n🔹 Conectando em ${projeto.nome}`);

  const supabase = window.supabase.createClient(
    projeto.url,
    projeto.key
  );

  const { error: loginError } = await supabase.auth.signInWithPassword({
    email: EMAIL,
    password: PASSWORD
  });

  if (loginError) {
    log(`Erro login (${projeto.nome}): ${loginError.message}`);
    return;
  }

  const { data, error } = await supabase
    .from("produtos")
    .select("*");

  if (error) {
    log(`Erro select (${projeto.nome}): ${error.message}`);
  } else {
    log(
      `${projeto.nome} | ${new Date().toLocaleTimeString()} | Registros: ${data.length}`
    );
  }

  await supabase.auth.signOut();
}

async function iniciar() {
  log("Iniciando simulação...");

  for (const projeto of PROJETOS) {
    await simularProjeto(projeto);
  }

const INTERVALO_3_DIAS = 3 * 24 * 60 * 60 * 1000;

// executa imediatamente uma vez
(async () => {
  for (const projeto of PROJETOS) {
    await simularProjeto(projeto);
  }
})();

// executa novamente a cada 3 dias
setInterval(async () => {
  for (const projeto of PROJETOS) {
    await simularProjeto(projeto);
  }
}, INTERVALO_3_DIAS);

iniciar();
