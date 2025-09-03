function runSimulation() {
    let optionType = document.getElementById("optionType").value;
    let S0 = parseFloat(document.getElementById("stockPrice").value);
    let K = parseFloat(document.getElementById("strikePrice").value);
    let T = parseFloat(document.getElementById("timeFraction").value);
    let r = parseFloat(document.getElementById("riskFreeRate").value);
    let sigma = parseFloat(document.getElementById("volatility").value);
    let numSimulations = parseInt(document.getElementById("numSimulations").value);

    let payoffSum = 0;
    let stockSum = 0;

    for (let i = 0; i < numSimulations; i++) {
        let z = randomNormal();
        let ST = S0 * Math.exp((r - 0.5 * sigma * sigma) * T + sigma * Math.sqrt(T) * z);

        stockSum += ST;

        let payoff = optionType === "C" ? Math.max(ST - K, 0) : Math.max(K - ST, 0);
        payoffSum += payoff;
    }

    let optionValue = Math.exp(-r * T) * (payoffSum / numSimulations);
    let avgStock = stockSum / numSimulations;

    document.getElementById("optionValue").innerText = "Option Value: " + optionValue.toFixed(4);
    document.getElementById("avgStock").innerText = "Average Stock Price at Expiration: " + avgStock.toFixed(4);
}

// Generate standard normal random variable using Box-Muller
function randomNormal() {
    let u1 = Math.random();
    let u2 = Math.random();
    return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
}
