
function startATM() {
  alert("Welcome to SBTS Bank ATM");

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
  let userPin = prompt("Enter your 4-digit PIN:");
  if (userPin === pin) {
    alert("PIN correct. Welcome to SBTS Bank!");
    mainMenu();
  } else {
    alert("Incorrect PIN. Please try again.");
    checkPin();
  }
}

// Show Balance
function showBalance() {
  alert("Your current balance is N" + balance);
  mainMenu();
}

// Deposit Money
function deposit() {
  let amount = parseFloat(prompt("Enter amount to deposit:"));
  if (isNaN(amount) || amount <= 0) {
    alert("Invalid amount!");
  } else {
    balance += amount;
    transactions.push({
      type: "deposit",
      amount: amount,
      date: new Date().toLocaleDateString(),
    });
    saveData();
    alert("You deposited N" + amount + "New balance: N" + balance);
  }
  mainMenu();
}

// Withdraw money
function Withdraw() {
  let amount = parseFloat(prompt("Enter amount to withdraw:"));
  if (isNaN(amount) || amount <= 0) {
    alert("Invalid amount!");
  } else if (amount > balance) {
    alert("Insufficient funds!");
  } else {
    balance -= amount;
    transactions.push({
      type: "withdrawal",
      amount: amount,
      date: new Date().toLocaleDateString(),
    });
    saveData();
    alert("You withdrew N" + amount + "New balance: N" + balance);
  }
  mainMenu();
}

// Transfer money
function transfer() {
  let receiver = prompt("Enter recipient's name or account number:");
  let amount = parseFloat(prompt("Enter amount to transfer:"));

  if (!receiver || receiver.trim() === "") {
    alert("Invalid recipient!");
  } else if (isNaN(amount) || amount <= 0) {
    alert("Invalid amount!");
  } else if (amount > balance) {
    alert("Insufficient funds for this transfer!");
  } else {
    balance -= amount;
    transactions.push({
      type: "transfer",
      amount: amount,
      receiver: receiver,
      date: new Date().toLocaleDateString(),
    });
    saveData();
    alert("You transfered N" + amount + " to " + receiver + " . ");
    alert("Your new balance is N" + balance);
  }
  mainMenu();
}

// Change PIN
function changePin() {
  let oldPin = prompt("Enter your current PIN:");

  if (oldPin !== pin) {
    alert("Incorrect current PIN:!");
  } else {
    let newPin = prompt("Enter your new 4-digit PIN:");
    let confirmPin = prompt("Confirm your new PIN:");

    if (newPin !== confirmPin) {
      alert("PINs do not match! Please try again.");
    } else if (newPin.length !== 4 || isNaN(newPin)) {
      alert("PIN must be exactly 4 numbers!");
    } else {
      pin = newPin;
      transactions.push({
      type: "PIN change",
      date: new Date().toLocaleDateString(),
    });
    saveData();
    alert("Pin changed successfully!");
    }
  }
  mainMenu();
}

// Mini Statement Function
function viewMiniStatement() {
  if (transactions.length === 0) {
    alert("No transactions yet!");
  } else {
    let statement = "MINI STATEMENT: \n\n";
    for (let t of transactions) {
      statement += `${t.date} - ${t.type} N${t.amount || ""} ${
        t.receiver ? " to " + t.receiver : ""
      }\n`;
    }
    alert(statement);
  }
  mainMenu();
}

// Thank you message
function thankYou() {
  alert("Thank you for using SBTS Bank ATM!");
}

// Main Menu
function mainMenu() {
  let option = prompt("Choose an option:\n1. Check Balance\n2. Deposit\n3. Withdraw\n4. Transfer\n5. Change PIN\n6. View Mini Statement\n7. Exit");

  switch (option) {
    case "1":
      showBalance();
      break;
    case "2":
      deposit();
      break;
    case "3":
      Withdraw();
      break;
    case "4":
      transfer();
      break;
    case "5":
      changePin();
      break;
    case "6":
      viewMiniStatement();
      break;
    case "7":
      thankYou();
      break;
      default:
        alert("invalid option, please try again.");
        mainMenu();
  }
}

// Start the App
checkPin();
}

document.getElementById("startBtn").addEventListener("click", startATM);
