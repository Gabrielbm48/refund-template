// Seleciona elementos de formulario e mensagem
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul");

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

function expenseAdd(newExpense) {
  try {
    // Cria o elemento li para adicionar o item na lista
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("newExpense");

    // Cria o ícone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // Adiciona as informações no item
    expenseItem.append(expenseIcon);
    expenseList.append(expenseItem);
  } catch (error) {
    alert("Não foi possível adicionar a despesa.");
    console.log(error);
  }
}
