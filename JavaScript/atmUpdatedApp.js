let balance = parseFloat(localStorage.getItem("balance")) || 0;
let pin = localStorage.getItem('pin') || "1234";
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Helper function to save data anytime it changes
function saveData() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("pin", pin);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// PIN check
function checkPin() {
  let userPin = document.getElementById("pinInput").value;
  if (userPin === pin) {
    showMessage("PIN correct!");
  } else {
    showMessage("Incorrect PIN. Please try again.");
    checkPin();
  }
}

// Show Balance
function showBalance() {
  showMessage("Your current balance is N" + balance);
}

/*function updateBalance() {
  document.getElementById("balance").textContent = balance.toFixed(2);
}*/

// Deposit
function showDeposit() {
  const inputArea = document.getElementById("inputArea");
  inputArea.innerHTML = `
  <h3> Deposit Money</h3>
  <input type="number"
  id="depositAmount" placeholder="Enter amount" />
  <input type="number"
  id="accountNumber" placeholder="Enter account number" />
  <button
  onclick="deposit()">Confirm Deposit</button>`; 
}

function deposit() {
  let amount = parseFloat(document.getElementById("depositAmount").value);
  if (isNaN(amount) || amount <= 0) {
    showMessage("Invalid amount!");
  } else {
    balance += amount;
    transactions.push({
      type: "deposit",
      amount: amount,
      date: new Date().toLocaleDateString(),
    });
    saveData();
    showMessage("You deposited: N" + amount.toFixed(2) +  "<br> To account number: " + document.getElementById("accountNumber").value + " <br>New balance: N" + balance.toFixed(2) );
  }
  document.getElementById("inputArea").innerHTML = "";
}

// Withdrawal
function showWithdraw() {
  const inputArea = document.getElementById("inputArea");
  inputArea.innerHTML = `
  <h3> Withdraw Money</h3>
  <input type="number"
  id="withdrawAmount" placeholder="Enter amount" />
  <input type="number"
  id="pinInput" placeholder="Enter 4-digit PIN" />
  <button
  onclick="withdraw()">Confirm Withdrawal</button>`; 
}

function withdraw() {
  let amount = parseFloat(document.getElementById("withdrawAmount").value);
  if (isNaN(amount) || amount <= 0) {
    showMessage("Invalid amount!");
  } else if (amount > balance) {
    showMessage("Insufficient funds!");
  } else {
    balance -= amount;
    checkPin();
    transactions.push({
      type: "withdrawal",
      amount: amount,
      date: new Date().toLocaleDateString(),
    });
    saveData();
    showMessage("You withdrew N" + amount.toFixed(2) + " <br>New balance: N" + balance.toFixed(2));
  }
  document.getElementById("inputArea").innerHTML = "";
}

// Transfer
function showTransfer() {
  const inputArea = document.getElementById("inputArea");
  inputArea.innerHTML = `
  <h3> Transfer Money</h3>
  <input type="text" id="receiver" placeholder="Enter receiver's name or account number" /><br>
    <input type="number"
  id="transferAmount" placeholder="Enter amount" />
  <input type="number"
  id="pinInput" placeholder="Enter 4-digit PIN" />
  <button
  onclick="transfer()">Confirm Transfer</button>`; 
}

function transfer() {
  let receiver = document.getElementById("receiver").value;
  const amount = parseFloat(document.getElementById("transferAmount").value);
  if (!receiver || receiver.trim() === "") {
    alert("Invalid recipient!");
  } else if (isNaN(amount) || amount <= 0) {
    alert("Invalid amount!");
  } else if (amount > balance) {
    alert("Insufficient funds for this transfer!");
  } else {
    balance -= amount;
    checkPin();
    transactions.push({
      type: "transfer",
      amount: amount,
      receiver: receiver,
      date: new Date().toLocaleDateString(),
    });
    saveData();
    showMessage("You transfered: N" + amount.toFixed(2) + " <br>To account number: " + receiver + " . " + " <br>Your new balance is: N" + balance.toFixed(2));
  }
  document.getElementById("inputArea").innerHTML = "";
}

// Mini Statement Function
function viewStatement() {
  if (transactions.length === 0) {
    alert("No transactions yet!");
  } else {
    let recentTransactions = transactions.slice(-10).reverse();
    let statement = "MINI STATEMENT: <br><br>";
    for (let t of recentTransactions) {
      statement += `<br>${t.date} - ${t.type} N${t.amount || ""} ${
        t.receiver ? " to " + t.receiver : ""
      }<br>`;
    }
    showMessage(statement);
  }
}

function showMessage(msg) {
  document.getElementById("output").innerHTML = msg;
}

function exitATM() {
  showMessage("Thank you for using SBTS ATM");

  document.getElementById("inputArea").innerHTML = "";
}

// Change PIN
function changePin() {
  document.getElementById("pin-reset-area").style.display = "block";
}

function submitPinChange() {
  let oldPinInput = document.getElementById("oldPin").value;
  let newPinInput = document.getElementById("newPin").value;
  let confirmPinInput = document.getElementById("confirmPin").value;

  if (oldPinInput !== pin) {
    showMessage("Incorrect current PIN!");
  } else if (newPinInput !== confirmPinInput) {
    showMessage("PINs do not match! Please try again.");
  } else if (newPinInput.length !== 4 || isNaN(newPinInput)) {
    showMessage("PIN must be exactly 4 numbers!");
  } else {
    pin = newPinInput;
    transactions.push({
      type: "PIN change",
      date: new Date().toLocaleDateString(),
    });
    saveData();
    showMessage("PIN changed successfully!");
    cancelPinChange();
  }
}

function cancelPinChange() {
  document.getElementById("pin-reset-area").style.display = "none";
  document.getElementById("oldPin").value = "";
  document.getElementById("newPin").value = "";
  document.getElementById("confirmPin").value = "";
}