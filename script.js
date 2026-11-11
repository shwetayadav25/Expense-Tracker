let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const form = document.getElementById("transaction-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (!title || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter valid details!");
        return;
    }

    const transaction = {
        id: Date.now(),
        title: title,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    saveData();
    updateUI();
    form.reset();
});

function saveData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateUI() {
    const income = transactions
        .filter(t => t.type === "income")
        .reduce((total, t) => total + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === "expense")
        .reduce((total, t) => total + t.amount, 0);

    document.getElementById("income").innerText = "₹" + income;
    document.getElementById("expense").innerText = "₹" + expense;
    document.getElementById("balance").innerText = "₹" + (income - expense);

    const list = document.getElementById("transaction-list");
    list.innerHTML = "";

    transactions.forEach(function(t) {
        const li = document.createElement("li");
        li.className = t.type;

        li.innerHTML = `
            <div class="transaction-info">
                <strong>${t.title}</strong>
                <span>₹${t.amount}</span>
            </div>
            <button class="delete-btn" type="button" onclick="deleteTransaction(${t.id})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveData();
    updateUI();
}

updateUI();