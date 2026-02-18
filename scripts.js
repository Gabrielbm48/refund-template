// Seleciona elementos de formulario e mensagem
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expensesTotal = document.querySelector("aside header H2");
const expensesQuantity = document.querySelector("aside header p span");

// Captura o evento de input e formata o valor
amount.oninput = () => {
  //obtém valor atural do inout e remove caracteres não numéricos
  let value = amount.value.replace(/\D/g, "");

  //Transformar valor em centavos
  value = Number(value) / 100;

  //Atualiza o valor do input
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  // Formata o valor no padrão BRL
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Retorna o valor formatado
  return value;
}
// Captura o evento de submit do formulário para pegar os valores
form.onsubmit = (event) => {
  // Evita o comportamento do form de dar reload
  event.preventDefault();
  // Cria um novo objeto com os dados preenchidos do formulário
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };
  console.log(newExpense);

  expenseAdd(newExpense);
};
// Adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // Cria o elemento li para adicionar o item na lista
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Cria o ícone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // Cria o a informação da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    //  Cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da despesa
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // Adicina nome e da categoria na div das informações da despesa
    expenseInfo.append(expenseName, expenseCategory);

    // Criar o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");

    // Adiciona o formato de moeda em R$
    const expenseAmoutBRL = document.createElement("small");
    expenseAmoutBRL.textContent = "R$";

    //Adiciona o valor da despesa
    expenseAmount.append(
      expenseAmoutBRL,
      newExpense.amount.toUpperCase().replace("R$", ""),
    );

    // Adicionar botao de remover
    const expenseRemove = document.createElement("img");
    expenseRemove.setAttribute("src", "./img/remove.svg");
    expenseRemove.setAttribute("alt", "remover");
    expenseRemove.classList.add("remove-icon");

    // Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseRemove);

    // Adiciona item na lista
    expenseList.append(expenseItem);

    // Limpa os campos do formulário
    formClear();
    // Atuliza os totais
    updateTotals();
  } catch (error) {
    alert("Não foi possível adicionar a despesa.");
    console.log(error);
  }
}

// Atualiza os totais de despesas
function updateTotals() {
  try {
    //Recupera todos os itens da lista
    const items = expenseList.children;

    // Atualiza a quantidade de itens da lista
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

    // Variável para indrementar o total
    let total = 0;

    // Percore cada item (li) dea lista (ul)
    for (let i = 0; i < items.length; i++) {
      const itemAmount = items[i].querySelector(".expense-amount");
      // Remover caracteres não numéricos e substituir a vírgula por ponto para converter em número
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      // Converter o valor para float
      value = parseFloat(value);

      // Verificar se é um número válido
      if (isNaN(value)) {
        return alert("Valor inválido encontrado. Verifique os itens da lista.");
      }

      // Incrementar o valor total
      total += value;
    }

    // Cria a span para adicionar o R$ formatado
    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    //Formata o valor e remover R$ que será exibido pela small com um estilo customizado
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    expensesTotal.innerHTML = "";

    expensesTotal.append(symbolBRL, total);
  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar os totais de despesas.");
  }
}

//Evento que captura o clique no botão de remover despesa
expenseList.addEventListener("click", function (event) {
  //verifica se o elemento clicado é o ícone de remover
  if (event.target.classList.contains("remove-icon")) {
    //Obtem o li pai do elemento clicado
    const item = event.target.closest(".expense");
    console.log(item);
    item.remove();

    // Atualiza os totais
    updateTotals();
  }
});

function formClear() {
  // Limpa os campos do formulário
  expense.value = "";
  category.value = "";
  amount.value = "";

  //Colocas o foco no input de despesa
  expense.focus();
}
