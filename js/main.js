$(window).bind("load", function() {

    var rpc_nodes = [
        "https://api.deathwing.me",
		"https://hive.roelandp.nl",
		"https://api.openhive.network",
		"https://rpc.ausbit.dev",
		"https://hived.emre.sh",
		"https://hive-api.arcange.eu",
		"https://api.hive.blog",
		"https://api.c0ff33a.uk",
		"https://rpc.ecency.com",
		"https://anyx.io",
		"https://techcoderx.com",
		"https://api.hive.blue",
		"https://rpc.mahdiyari.info"
    ];

    var he_rpc_nodes = [
        "https://engine.rishipanthee.com", 
		"https://ha.herpc.dtools.dev", 
		"https://api.hive-engine.com",
		"https://api.primersion.com",
		"https://herpc.actifit.io"
    ];

    let ssc;

    var hiveCoinGeckoAPI = "https://api.coingecko.com/api/v3/simple/price?ids=hive&vs_currencies=usd";
    var hiveMessariAPI = "https://data.messari.io/api/v1/assets/hive/metrics";
    var hiveCoinCapAPI = "https://api.coincap.io/v2/assets/hive-blockchain";
    var hiveCryptoCompareAPI = "https://min-api.cryptocompare.com/data/price?fsym=HIVE&tsyms=USD";
    
    async function checkHiveNodeStatus(nodeUrl, statusElement) {
        try 
        {
            const response = await axios.get(nodeUrl);
            if (response.status === 200) 
            {
                statusElement.textContent = "Working";
                statusElement.classList.remove("fail"); // Remove "fail" class if present
                statusElement.classList.add("working");
            } 
            else 
            {
                statusElement.textContent = "Fail";
                statusElement.classList.remove("working"); // Remove "working" class if present
                statusElement.classList.add("fail");
            }
        } 
        catch (error) 
        {
          statusElement.textContent = "Fail";
          statusElement.classList.remove("working"); // Remove "working" class if present
          statusElement.classList.add("fail");
        }
    };
      
    async function addHiveNodes() {
        try 
        {
            var buttonHive = document.getElementById("popup-button-hive");
            var popupHive = document.getElementById("popup-container-hive");
            const tableBody = document.querySelector("#api-list-hive tbody");
            const workingNodes = [];
            const failedNodes = [];            

            // Function to enable the button
            function enableButton() 
            {
                buttonHive.disabled = false;
            }

            // Clear the existing table body content
            tableBody.innerHTML = "";
    
            for (let i = 0; i < rpc_nodes.length; i++) 
            {
                const nodeUrl = rpc_nodes[i];
                const row = document.createElement("tr");
                const urlCell = document.createElement("td");
                const statusCell = document.createElement("td");
    
                urlCell.textContent = nodeUrl;
                urlCell.classList.add("node-url"); // add new class to url cell
                statusCell.textContent = "Checking...";
    
                row.appendChild(urlCell);
                row.appendChild(statusCell);
    
                tableBody.appendChild(row);
    
                // Check node status
                checkHiveNodeStatus(nodeUrl, statusCell);
            }
    
            // Reorder the list of nodes based on their status
            setTimeout(() => {
                const rows = Array.from(tableBody.getElementsByTagName("tr"));
    
                rows.forEach((row) => {
                    if (row.lastChild.textContent === "Working") 
                    {
                        workingNodes.push(row);
                    } 
                    else 
                    {
                        failedNodes.push(row);
                    }
                });
    
                tableBody.innerHTML = "";
    
                // Append workingNodes first, then failedNodes
                workingNodes.forEach((row) => {
                    tableBody.appendChild(row);
                });
    
                failedNodes.forEach((row) => {
                    tableBody.appendChild(row);
                });
            }, 5000);
    
            // Add event listeners to the rows in the table body
            var rowsHive = tableBody.getElementsByTagName("tr");
            for (var i = 0; i < rowsHive.length; i++) 
            {
                rowsHive[i].addEventListener("click", function (event) {
                    // Prevent the default link behavior
                    event.preventDefault();
    
                    // Get the node URL from the first cell in the row
                    var nodeUrl = this.cells[0].textContent;
    
                    // Set the API endpoint to the selected node
                    hive.api.setOptions({ url: nodeUrl });
    
                    // Update the button text
                    buttonHive.value = nodeUrl;
                    buttonHive.innerHTML = nodeUrl;
    
                    // Save the selected endpoint to local storage
                    localStorage.setItem("selectedEndpoint", nodeUrl);
    
                    // Hide the popup
                    popupHive.style.display = "none";
                    
                    enableButton();
    
                    // Reload the page after 1 second (adjust the time as needed)
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                });
            }
        } 
        catch (error) 
        {
            console.log("Error at addHiveNodes(): ", error);
        }
    };       

    async function checkEngineNodeStatus(nodeUrl, statusElement) {
        try 
        {
            const response = await axios.get(nodeUrl);
            if (response.status === 200) 
            {
                statusElement.textContent = "Working";
                statusElement.classList.remove("fail"); // Remove "fail" class if present
                statusElement.classList.add("working");
            } 
            else 
            {
                statusElement.textContent = "Fail";
                statusElement.classList.remove("working"); // Remove "working" class if present
                statusElement.classList.add("fail");
            }
        } 
        catch (error) 
        {
          statusElement.textContent = "Fail";
          statusElement.classList.remove("working"); // Remove "working" class if present
          statusElement.classList.add("fail");
        }
    };

    async function addEngineNodes() {
        try {
            var buttonEngine = document.getElementById("popup-button-engine");
            var popupEngine = document.getElementById("popup-container-engine");
            const tableBody = document.querySelector("#api-list-engine tbody");
            const workingNodes = [];
            const failedNodes = [];
    
            // Function to enable the button
            function enableButton() {
                buttonEngine.disabled = false;
            }
    
            // Clear the existing table body content
            tableBody.innerHTML = "";
    
            for (let i = 0; i < he_rpc_nodes.length; i++) 
            {
                const nodeUrl = he_rpc_nodes[i];
                const row = document.createElement("tr");
                const urlCell = document.createElement("td");
                const statusCell = document.createElement("td");
    
                urlCell.textContent = nodeUrl;
                urlCell.classList.add("node-url"); // add new class to url cell
                statusCell.textContent = "Checking...";
    
                row.appendChild(urlCell);
                row.appendChild(statusCell);
    
                tableBody.appendChild(row);
    
                // Check node status
                checkEngineNodeStatus(nodeUrl, statusCell);
            }
    
            // Reorder the list of nodes based on their status
            setTimeout(() => {
                const rows = Array.from(tableBody.getElementsByTagName("tr"));
    
                rows.forEach((row) => {
                    if (row.lastChild.textContent === "Working") {
                        workingNodes.push(row);
                    } else {
                        failedNodes.push(row);
                    }
                });
    
                tableBody.innerHTML = "";
    
                // Append workingNodes first, then failedNodes
                workingNodes.forEach((row) => {
                    tableBody.appendChild(row);
                });
    
                failedNodes.forEach((row) => {
                    tableBody.appendChild(row);
                });
            }, 5000);
    
            // Add event listeners to the rows in the table body
            var rowsEngine = tableBody.getElementsByTagName("tr");
            for (var i = 0; i < rowsEngine.length; i++) 
            {
                rowsEngine[i].addEventListener("click", function (event) {
                    // Prevent the default link behavior
                    event.preventDefault();
    
                    // Get the node URL from the first cell in the row
                    var nodeUrl = this.cells[0].textContent;
    
                    // Set the API endpoint to the selected node
                    ssc = new SSC(nodeUrl);
    
                    // Update the button text
                    buttonEngine.value = nodeUrl;
                    buttonEngine.innerHTML = nodeUrl;
    
                    // Save the selected endpoint to local storage
                    localStorage.setItem("selectedEngEndpoint", nodeUrl);
    
                    // Hide the popup
                    popupEngine.style.display = "none";
    
                    enableButton();
    
                    // Reload the page after 1 second (adjust the time as needed)
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                });
            }
        } 
        catch (error) 
        {
            console.log("Error at addEngineNodes(): ", error);
        }
    };      
    
    async function initializeHiveAPI() {
        var selectedEndpoint = await getSelectedEndpoint();
        console.log("SELECT HIVE API NODE : ", selectedEndpoint);
        hive.api.setOptions({ url: selectedEndpoint });

        var button = document.getElementById("popup-button-hive");
        button.value = selectedEndpoint;
        button.innerHTML = selectedEndpoint;
    };

    async function initializeEngineAPI() {
        var selectedEngEndpoint = await getSelectedEngEndpoint();
        console.log("SELECT ENGINE API NODE : ", selectedEngEndpoint);
        ssc = new SSC(selectedEngEndpoint);

        var button = document.getElementById("popup-button-engine");
        button.value = selectedEngEndpoint;
        button.innerHTML = selectedEngEndpoint;
    };

    async function processAPIs() {
        try 
        {              
            await initializeHiveAPI();
            await initializeEngineAPI();            
        } 
        catch (error) 
        {
            console.log("Error while processing APIs: ", error);
        }
    };
      
    processAPIs();    

    hive.config.set('alternative_api_endpoints', rpc_nodes);

    // remove unnessary parameters from url
    window.history.replaceState({}, document.title, "/" + "");

    var user = null;

    const MINHELIOS = 5;
    const MINATH = 10;

    const TIMEOUT = 8000;

    var CALLERJSON = [];

    async function processAll () {
        //getBridge();
        getSurfHistory();
        getBeeHistory();
        getPobHistory();
    };

    processAll(); 
    
    async function getBridge () {
        try
        {
            const res = await hive.api.getAccountsAsync(['uswap']);
            console.log("res : ", res);
            const res2 = await ssc.findOne("tokens", "balances", { account: 'uswap', symbol: 'SWAP.HIVE' });
            console.log("res2 : ", res2);
            $("#hive_liq").text(parseInt(res[0].balance.split(" ")[0]));
            $("#swap_liq").text(parseInt(res2.balance));
            $("#bridge").removeClass("d-none");
        }
        catch (error)
        {
            console.log("Error at getBridge : ", error);
        }
    };    

    function dec(val) {
        return Math.floor(val * 1000) / 1000;
    };

    async function getSurfHistory () {
        try
        {
            const historyRaw = await hive.api.getAccountHistoryAsync("helios.voter", -1, 100, '1', null);        

            // loop through history and create an array with only tx id, author, link and timestamp
            let history = historyRaw.map((tx) => {
                const { timestamp, op, trx_id } = tx[1];
                const { author, permlink, weight, voter } = op[1];           
                return { timestamp, author, permlink, weight, trx_id, voter };
            });

            // filter out only vote transactions with weight > 0
            history = history.filter((tx) => {
                return tx.voter == "helios.voter" && tx.weight > 0;
            });

            // fitler out only last 10 transactions
            history = history.slice(-10);

            // reverse the array so that the latest transaction is on top
            history = history.reverse();

            console.log(history);

            // loop through history and create html (author (with @), permlink (link to the post with first 10 characters), weight (in percent), timestamp string date, tx id (last 6 characters))
            history.forEach((tx) => {            
                const { timestamp, author, permlink, weight, trx_id, voter } = tx;
                const date = new Date(timestamp);
                const dateString = date.toDateString();
                const timeString = date.toLocaleTimeString();
                const txIdShort = trx_id.slice(-15);
                const permlinkShort = permlink.slice(0, 20);
                const weightPercent = weight / 100;
                const html = `
                    <tr class="table-font">
                        <td><a class="link-info" href="https://peakd.com/@${author}" target="_blank">@${author}</a></td>
                        <td><a class="link-info" href="https://peakd.com/@${author}/${permlink}" target="_blank">${permlinkShort}...</a></td>
                        <td>${weightPercent}%</td>
                        <td>${dateString} ${timeString}</td>
                        <td><a class="link-info" href="https://hiveblocks.com/tx/${trx_id}" target="_blank">${txIdShort}...</a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                        </svg>
                        </td>
                    </tr>
                `;
                $("#surfhistory").append(html);
            });

            // show history table
            $("#surfhistorycard").removeClass("d-none");
            // add flex
            $("#surfhistorycard").addClass("d-flex");
        }
        catch (error)
        {
            console.log("Error at getSurfHistory() : ", );
        }
    };

    async function getBeeHistory () {
        try
        {
            const historyRaw = await hive.api.getAccountHistoryAsync("bee.voter", -1, 100, '1', null);        

            // loop through history and create an array with only tx id, author, link and timestamp
            let history = historyRaw.map((tx) => {
                const { timestamp, op, trx_id } = tx[1];
                const { author, permlink, weight, voter } = op[1];           
                return { timestamp, author, permlink, weight, trx_id, voter };
            });

            // filter out only vote transactions with weight > 0
            history = history.filter((tx) => {
                return tx.voter == "bee.voter" && tx.weight > 0;
            });

            // fitler out only last 10 transactions
            history = history.slice(-10);

            // reverse the array so that the latest transaction is on top
            history = history.reverse();

            console.log(history);

            // loop through history and create html (author (with @), permlink (link to the post with first 10 characters), weight (in percent), timestamp string date, tx id (last 6 characters))
            history.forEach((tx) => {            
                const { timestamp, author, permlink, weight, trx_id, voter } = tx;
                const date = new Date(timestamp);
                const dateString = date.toDateString();
                const timeString = date.toLocaleTimeString();
                const txIdShort = trx_id.slice(-15);
                const permlinkShort = permlink.slice(0, 20);
                const weightPercent = weight / 100;
                const html = `
                    <tr class="table-font">
                        <td><a class="link-info" href="https://peakd.com/@${author}" target="_blank">@${author}</a></td>
                        <td><a class="link-info" href="https://peakd.com/@${author}/${permlink}" target="_blank">${permlinkShort}...</a></td>
                        <td>${weightPercent}%</td>
                        <td>${dateString} ${timeString}</td>
                        <td><a class="link-info" href="https://hiveblocks.com/tx/${trx_id}" target="_blank">${txIdShort}...</a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                        </svg>
                        </td>
                    </tr>
                `;
                $("#beehistory").append(html);
            });

            // show history table
            $("#beehistorycard").removeClass("d-none");
            // add flex
            $("#beehistorycard").addClass("d-flex");
        }
        catch (error)
        {
            console.log("Error at getBeeHistory() : ", );
        }
    };    

    async function getPobHistory () {
        try
        {
            const historyRaw = await hive.api.getAccountHistoryAsync("pob.voter", -1, 100, '1', null);        

            // loop through history and create an array with only tx id, author, link and timestamp
            let history = historyRaw.map((tx) => {
                const { timestamp, op, trx_id } = tx[1];
                const { author, permlink, weight, voter } = op[1];           
                return { timestamp, author, permlink, weight, trx_id, voter };
            });

            // filter out only vote transactions with weight > 0
            history = history.filter((tx) => {
                return tx.voter == "pob.voter" && tx.weight > 0;
            });

            // fitler out only last 10 transactions
            history = history.slice(-10);

            // reverse the array so that the latest transaction is on top
            history = history.reverse();

            console.log(history);

            // loop through history and create html (author (with @), permlink (link to the post with first 10 characters), weight (in percent), timestamp string date, tx id (last 6 characters))
            history.forEach((tx) => {            
                const { timestamp, author, permlink, weight, trx_id, voter } = tx;
                const date = new Date(timestamp);
                const dateString = date.toDateString();
                const timeString = date.toLocaleTimeString();
                const txIdShort = trx_id.slice(-15);
                const permlinkShort = permlink.slice(0, 20);
                const weightPercent = weight / 100;
                const html = `
                    <tr class="table-font">
                        <td><a class="link-info" href="https://peakd.com/@${author}" target="_blank">@${author}</a></td>
                        <td><a class="link-info" href="https://peakd.com/@${author}/${permlink}" target="_blank">${permlinkShort}...</a></td>
                        <td>${weightPercent}%</td>
                        <td>${dateString} ${timeString}</td>
                        <td><a class="link-info" href="https://hiveblocks.com/tx/${trx_id}" target="_blank">${txIdShort}...</a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                        </svg>
                        </td>
                    </tr>
                `;
                $("#pobhistory").append(html);
            });

            // show history table
            $("#pobhistorycard").removeClass("d-none");
            // add flex
            $("#pobhistorycard").addClass("d-flex");
        }
        catch (error)
        {
            console.log("Error at getPobHistory() : ", );
        }
    };    

    $(document).ready(function() {        
        refresh(); 
        loadHiveNode();
        loadEngineNode();
        clickFunctions();
        actionTriggers();
    });

    async function loadHiveNode() {
        try 
        {
            // Get a reference to the button and the popup container
            var buttonHive = document.getElementById("popup-button-hive");
            var popupHive = document.getElementById("popup-container-hive");          
    
            // Store the interval ID
            var addHiveNodesInterval;

            // Function to disable the button
            function disableButton() {
                buttonHive.disabled = true;
            }

            // Function to enable the button
            function enableButton() {
                buttonHive.disabled = false;
            }
    
            // Add an event listener to the button
            buttonHive.addEventListener("click", function () {
                // Show the popup
                popupHive.style.display = "block";
                disableButton();
                addHiveNodes();
                addHiveNodesInterval = setInterval(addHiveNodes, 60000);
            });
    
            // Get a reference to the API list table body
            var tableBodyHive = document.querySelector("#api-list-hive tbody");
    
            // Add an event listener to the close button
            var closeButtonHive = document.getElementById("close-button-hive");
            closeButtonHive.addEventListener("click", function () {
                // Hide the popup
                popupHive.style.display = "none";
                enableButton();
    
                // Clear the interval if it exists
                if (addHiveNodesInterval) 
                {
                    clearInterval(addHiveNodesInterval);
                }
    
                // Remove all rows from the table body
                tableBodyHive.innerHTML = "";
            });
    
            // Add an event listener to the table body
            tableBodyHive.addEventListener("click", function (event) {
                var target = event.target;
                if (target && target.nodeName === "TD") 
                {
                    // Get the node URL from the first cell in the row
                    var nodeUrl = target.parentNode.cells[0].textContent;
    
                    // Set the API endpoint to the selected node
                    hive.api.setOptions({ url: nodeUrl });
    
                    // Update the button text
                    buttonHive.value = nodeUrl;
                    buttonHive.innerHTML = nodeUrl;
    
                    // Save the selected endpoint to local storage
                    localStorage.setItem("selectedEndpoint", nodeUrl);
    
                    // Hide the popup
                    popupHive.style.display = "none";
                    enableButton();
    
                    // Remove all rows from the table body
                    tableBodyHive.innerHTML = "";
    
                    // Reload the page after 1 second (adjust the time as needed)
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
            });

            // Add an event listener to check if the popup is still open after 1 minute
            popupHive.addEventListener("transitionend", function () {
                if (popupHive.style.display === "block") 
                {
                    // Clear the interval if it exists
                    if (addHiveNodesInterval) {
                        clearInterval(addHiveNodesInterval);
                    }

                    // Update the current set of APIs
                    addHiveNodes();
                    addHiveNodesInterval = setInterval(addHiveNodes, 60000);
                }
            });
        } 
        catch (error) 
        {
            console.log("Error at loadHiveNode(): ", error);
        }
    };
    
    async function loadEngineNode() {
        try 
        {
            // Get a reference to the button and the popup container
            var buttonEngine = document.getElementById("popup-button-engine");
            var popupEngine = document.getElementById("popup-container-engine");

            // Store the interval ID
            var addEngineNodesInterval;

            // Function to disable the button
            function disableButton() 
            {
                buttonEngine.disabled = true;
            }

            // Function to enable the button
            function enableButton() 
            {
                buttonEngine.disabled = false;
            }

            // Add an event listener to the button
            buttonEngine.addEventListener("click", function () {
                // Show the popup
                popupEngine.style.display = "block";
                disableButton();
                addEngineNodes();
                addEngineNodesInterval = setInterval(addEngineNodes, 60000);
            });

            // Get a reference to the API list table body
            var tableBodyEngine = document.querySelector("#api-list-engine tbody");

            // Add an event listener to the close button
            var closeButtonEngine = document.getElementById("close-button-engine");
            closeButtonEngine.addEventListener("click", function () {
                // Hide the popup
                popupEngine.style.display = "none";
                enableButton();

                // Clear the interval if it exists
                if (addEngineNodesInterval) 
                {
                    clearInterval(addEngineNodesInterval);
                }

                // Remove all rows from the table body
                tableBodyEngine.innerHTML = "";
            });

            // Add an event listener to the table body
            tableBodyEngine.addEventListener("click", function (event) {
                var target = event.target;
                if (target && target.nodeName === "TD") 
                {
                    // Get the node URL from the first cell in the row
                    var nodeUrl = target.parentNode.cells[0].textContent;

                    // Set the API endpoint to the selected node
                    ssc = new SSC(nodeUrl);

                    // Update the button text
                    buttonEngine.value = nodeUrl;
                    buttonEngine.innerHTML = nodeUrl;

                    // Save the selected endpoint to local storage
                    localStorage.setItem("selectedEngEndpoint", nodeUrl);

                    // Hide the popup
                    popupEngine.style.display = "none";
                    enableButton();

                    // Remove all rows from the table body
                    tableBodyEngine.innerHTML = "";

                    // Reload the page after 1 second (adjust the time as needed)
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
            });

            // Add an event listener to check if the popup is still open after 1 minute
            popupEngine.addEventListener("transitionend", function () {
                if (popupEngine.style.display === "block") 
                {
                    // Clear the interval if it exists
                    if (addEngineNodesInterval) {
                        clearInterval(addEngineNodesInterval);
                    }

                    // Update the current set of APIs
                    addEngineNodes();
                    addEngineNodesInterval = setInterval(addEngineNodes, 60000);
                }
            });
        } 
        catch (error) 
        {
            console.log("Error at loadEngineNode(): ", error);
        }
    };

    async function getHeliosBalances (account) {
        var heliosJson = [];
        try
        {
            const res = await hive.api.getAccountsAsync([account]);
            if (res.length > 0) 
            {
                const balHelios = await getTokenBalance(account, "HELIOS");
                const marketHelios = await getMarketInfo(["HELIOS"]);                
                
                const savedHivePrice = localStorage.getItem("hivePrice");
                var hiveUSD = parseFloat(savedHivePrice);                
                if (hiveUSD <= 0 || isNaN(hiveUSD)) 
                {
                    hiveUSD = await getHiveUSD();
                }                                
                
                if (balHelios.length > 0 && marketHelios.length > 0 && hiveUSD > 0) 
                {
                    var val = (parseFloat(balHelios[0].balance) * parseFloat(marketHelios[0].lastPrice)) * parseFloat(hiveUSD);
                    
                    var ddata = {
                        "heliosVal" : dec(balHelios[0].balance),
                        "hiveVal" :  parseFloat(val).toFixed(3)
                    }
                    heliosJson.push(ddata);
                    return heliosJson;
                } 
                else 
                {
                    var ddata = {
                        "heliosVal" : 0.0,
                        "hiveVal" :  0.0
                    } 
                    heliosJson.push(ddata);
                    return heliosJson;
                }
            } 
            else 
            {
                var ddata = {
                    "heliosVal" : 0.0,
                    "hiveVal" :  0.0
                } 
                heliosJson.push(ddata);
                return heliosJson;
            }
        }
        catch (error)
        {
            console.log("Error at getHeliosBalances() : ", error);
            var ddata = {
                "heliosVal" : 0.0,
                "hiveVal" :  0.0
            } 
            heliosJson.push(ddata);
            return heliosJson;
        }
    };

    async function getAthonBalances (account) {
        var athonJson = [];
        try
        {
            const res = await hive.api.getAccountsAsync([account]);
            if (res.length > 0) 
            {
                const balAthon = await getTokenBalance(account, "ATH");
                const marketAthon = await getMarketInfo(["ATH"]);
                
                const savedHivePrice = localStorage.getItem("hivePrice");
                var hiveUSD = parseFloat(savedHivePrice);                
                if (hiveUSD <= 0 || isNaN(hiveUSD)) 
                {
                    hiveUSD = await getHiveUSD();
                }                                
                
                if (balAthon.length > 0 && marketAthon.length > 0 && hiveUSD > 0) 
                {
                    var val = (parseFloat(balAthon[0].balance) * parseFloat(marketAthon[0].lastPrice)) * parseFloat(hiveUSD);
                    
                    var ddata = {
                        "athonVal" : dec(balAthon[0].balance),
                        "hiveVal" :  parseFloat(val).toFixed(3)
                    }
                    athonJson.push(ddata);
                    return athonJson;
                } 
                else 
                {
                    var ddata = {
                        "athonVal" : 0.0,
                        "hiveVal" :  0.0
                    } 
                    athonJson.push(ddata);
                    return athonJson;
                }
            } 
            else 
            {
                var ddata = {
                    "athonVal" : 0.0,
                    "hiveVal" :  0.0
                } 
                athonJson.push(ddata);
                return athonJson;
            }
        }
        catch (error)
        {
            console.log("Error at getAthonBalances() : ", error);
            var ddata = {
                "athonVal" : 0.0,
                "hiveVal" :  0.0
            } 
            athonJson.push(ddata);
            return athonJson;
        }
    };   

    async function getTokenBalance (account, symbol) {
        var tokenJson = [];
        try
        {
            tokenJson = await ssc.find("tokens", "balances", { account, symbol: symbol }, 1000, 0, []);
            return tokenJson;
        }
        catch (error)
        {
            console.log("Error at getTokenBalance() : ", error);
            return tokenJson;
        }
    };

    async function getMarketInfo (symbols) {
        var marketJson = [];
        try
        {           
            marketJson = await ssc.find("market", "metrics", { symbol: { "$in": [...symbols] } }, 1000, 0, []);            
            return marketJson;
        }
        catch (error)
        {
            console.log("Error at getMarket() : ", error);
            return marketJson;
        }
    };

    // Check With USD Start Here

    async function getHiveUSD () {
        var hiveUSD = 0.0;
        try
        {
            hiveUSD = await getCryptoComparePrice();
            if(hiveUSD <= 0)
            {
                hiveUSD = await getCoinGeckoPrice();
                if(hiveUSD <= 0)
                {
                    hiveUSD = await getCoinCapPrice();
                    if(hiveUSD <= 0)
                    {
                        hiveUSD = await getMessariPrice();
                    }
                }
            }
            return hiveUSD;
        }
        catch (error)
        {
            console.log("Error at getHiveUSD() : ", error);
            return hiveUSD;
        }
    };

    async function getCoinGeckoPrice () {
        var hPrice = 0.0;
        try
        {
            const { data } = await axios.get(hiveCoinGeckoAPI);
            hPrice = data.hive.usd;            
            return hPrice;
        }
        catch (error)
        {
            console.log("Error at getCoinGeckoPrice() : ", error);
            return hPrice;
        }
    };

    async function getMessariPrice () {
        var hPrice = 0.0;
        try
        {
            const { data } = await axios.get(hiveMessariAPI);
            hPrice = data.data.market_data.price_usd;            
            return hPrice;
        }
        catch (error)
        {
            console.log("Error at getMessariPrice() : ", error);
            return hPrice;
        }
    };

    async function getCoinCapPrice () {
        var hPrice = 0.0;
        try
        {
            const { data } = await axios.get(hiveCoinCapAPI);
            hPrice = data.data.priceUsd;            
            return hPrice;
        }
        catch (error)
        {
            console.log("Error at getCoinCapPrice() : ", error);
            return hPrice;
        }
    };

    async function getCryptoComparePrice () {
        var hPrice = 0.0;
        try
        {
            const { data } = await axios.get(hiveCryptoCompareAPI);
            hPrice = data.USD;            
            return hPrice;
        }
        catch (error)
        {
            console.log("Error at getCryptoComparePrice() : ", error);
            return hPrice;
        }
    };

    // Check With UDSD End Here

    async function clickFunctions () {
        try
        {
            $("#refresh").click(async function () {
                $(this).attr("disabled", true);
                await refresh();
                $(this).removeAttr("disabled");
            });

            $("#refreshSurfHistory").click(() => {
                // Empty history table with a fade-out effect
                $("#surfhistory").fadeOut(200, function() {
                    $(this).empty();
                    // Set a small timeout before executing getSurfHistory()
                    setTimeout(() => {
                        getSurfHistory();
                        // Fade-in the history table after the data is loaded
                        $("#surfhistory").fadeIn(200);
                    }, 500); // Adjust the timeout value (in milliseconds) as needed
                });
            });

            $("#refreshPobHistory").click(() => {
                // Empty history table with a fade-out effect
                $("#pobhistory").fadeOut(200, function() {
                    $(this).empty();
                    // Set a small timeout before executing getBeeHistory()
                    setTimeout(() => {
                        getPobHistory();
                        // Fade-in the history table after the data is loaded
                        $("#pobhistory").fadeIn(200);
                    }, 500); // Adjust the timeout value (in milliseconds) as needed
                });
            });

            $("#refreshBeeHistory").click(() => {
                // Empty history table with a fade-out effect
                $("#beehistory").fadeOut(200, function() {
                    $(this).empty();
                    // Set a small timeout before executing getBeeHistory()
                    setTimeout(() => {
                        getBeeHistory();
                        // Fade-in the history table after the data is loaded
                        $("#beehistory").fadeIn(200);
                    }, 500); // Adjust the timeout value (in milliseconds) as needed
                });
            });

            $("#checkbalance").click(async function() {
                try
                {
                    user = $.trim($("#username").val().toLowerCase());
                    if (user.length >= 3) {
                        $(this).attr("disabled", "true");
                        await updateBalance();
                        $(this).removeAttr("disabled");
                        localStorage['user'] = user;
                    }
                }
                catch (error)
                {
                    console.log("Error at checkbalance-Click : ", error);
                }
            });        
        }
        catch (error)
        {
            console.log("Error at clickFunctions() : ", error);
        }
    };

    async function refresh () {
        try
        {
            var marketInfo = await getMarketInfo(["HELIOS", "ATH"]);

            const savedHivePrice = localStorage.getItem("hivePrice");
            var hiveUSD = parseFloat(savedHivePrice);                
            if (hiveUSD <= 0 || isNaN(hiveUSD)) 
            {
                hiveUSD = await getHiveUSD();
            }

            if(marketInfo.length > 0)
            {
                var helios_price = 0.0, helios_value = 0.0, helios_vol = 0.0, helios_change = 0.0;            
                if(marketInfo[0].symbol == "HELIOS")
                {
                    helios_price = parseFloat(marketInfo[0].lastPrice) || 0.0;
                    helios_value = parseFloat(marketInfo[0].lastPrice * hiveUSD) || 0.0;
                    helios_vol = parseFloat(marketInfo[0].volume * hiveUSD) || 0.0;
                    helios_change = parseFloat(marketInfo[0].priceChangePercent) || 0.0;
                }

                var athon_price = 0.0, athon_value = 0.0, athon_vol = 0.0, athon_change = 0.0;            
                if(marketInfo[1].symbol == "ATH")
                {
                    athon_price = parseFloat(marketInfo[1].lastPrice) || 0.0;
                    athon_value = parseFloat(marketInfo[1].lastPrice * hiveUSD) || 0.0;
                    athon_vol = parseFloat(marketInfo[1].volume * hiveUSD) || 0.0;
                    athon_change = parseFloat(marketInfo[1].priceChangePercent) || 0.0;
                }

                $("#helios_price").text(helios_price.toFixed(3));
                $("#helios_value").text(helios_value.toFixed(3));
                $("#helios_vol").text(helios_vol.toFixed(3));
                $("#helios_change").text(helios_change.toFixed(3));
                $("#athon_price").text(athon_price.toFixed(3));
                $("#athon_value").text(athon_value.toFixed(3));
                $("#athon_vol").text(athon_vol.toFixed(3));
                $("#athon_change").text(athon_change.toFixed(3));
            }
            else
            {
                $("#helios_price").text("0.000");
                $("#helios_value").text("0.000");
                $("#helios_vol").text("0.000");
                $("#helios_change").text("0.000");
                $("#athon_price").text("0.000");
                $("#athon_value").text("0.000");
                $("#athon_vol").text("0.000");
                $("#athon_change").text("0.000");
            }
        }
        catch (error)
        {
            console.log("Error At refresh() : ", error);

            $("#helios_price").text("0.000");
            $("#helios_value").text("0.000");
            $("#helios_vol").text("0.000");
            $("#helios_change").text("0.000");
            $("#athon_price").text("0.000");
            $("#athon_value").text("0.000");
            $("#athon_vol").text("0.000");
            $("#athon_change").text("0.000");
        }
    };

    async function actionTriggers () {
        try
        {            
            var prevSurfValue = "", prevBeeValue = "", prevPobValue = "";  
            const postLinkField = document.getElementById("postlink");
            const usernameInput = document.getElementById("username");

            const surfSvg = document.getElementById("surf-svg");
            const surfAvail = document.getElementById("surf-avail");
            const inputSurfAvail = document.getElementById("input-surf-avail");
            const buttonSurfAvail = document.getElementById("button-surf-avail");
            const buttonAddSurfAvail = document.getElementById("add-surf-avail");
            const buttonSurfAddRemove = document.getElementById("surf-add-button");
            const surfAddSvg = document.getElementById("surf-add-svg");

            const beeSvg = document.getElementById("bee-svg");
            const beeAvail = document.getElementById("bee-avail");
            const inputBeeAvail = document.getElementById("input-bee-avail");
            const buttonBeeAvail = document.getElementById("button-bee-avail");
            const buttonAddBeeAvail = document.getElementById("add-bee-avail");
            const buttonBeeAddRemove = document.getElementById("bee-add-button");
            const beeAddSvg = document.getElementById("bee-add-svg");

            const pobSvg = document.getElementById("pob-svg");
            const pobAvail = document.getElementById("pob-avail");
            const inputPobAvail = document.getElementById("input-pob-avail");
            const buttonPobAvail = document.getElementById("button-pob-avail");
            const buttonAddPobAvail = document.getElementById("add-pob-avail");
            const buttonPobAddRemove = document.getElementById("pob-add-button");
            const pobAddSvg = document.getElementById("pob-add-svg");
            
            const buttonBurnTokens = document.getElementById("burn-token");

            const heliosBalanceInput = document.getElementById("helios_bal");
            const athonBalanceInput = document.getElementById("athon_bal");

            usernameInput.addEventListener("input", async function() {
                try
                {                    
                    updateBalance();
                    await removeSurfJson();                                                             
                    await updateSurfElements(); 
                    await removeBeeJson();                                                             
                    await updateBeeElements(); 
                    await removePobJson();                                                             
                    await updatePobElements();
                    await totalBurnTextInitiate();                                       
                }
                catch (error)
                {
                    console.log("Error at usernameInput.addEventListener() - input : ", error);
                }
            });

            postLinkField.addEventListener("input", async function() {
                try
                {                    
                    var postInfo = await postURL(postLinkField.value);                                       
                    await surfValidPost(postInfo[0]);
                    await beeValidPost(postInfo[0]);
                    await pobValidPost(postInfo[0]);                    
                }
                catch (error)
                {
                    console.log("Error at postLinkField.addEventListener() - input : ", error);
                }
            }); 
            
            buttonBurnTokens.addEventListener("click", async function() {
                try 
                {
                    var handShakeStatus = await keyChainAvailability();
                    if (handShakeStatus == true) 
                    {
                        $("#loading").removeClass("d-none");
                        $("#loading").removeClass("loading-style");
                        $("#status").text("Please wait...");
                        await sendTransactions();
                    } 
                    else 
                    {
                        $("#status").text("No method of transaction available. Install Keychain.");
                    }
                } 
                catch (error) 
                {
                    console.log("Error at buttonBurnTokens.addEventListener() - click:", error);
                } 
            });
              
            async function sendTransactions() {
                try 
                {
                    var callUser = usernameInput.value;
                    $("#loading").removeClass("d-none");
                    $("#loading").removeClass("loading-style");
                    $("#status").text("Confirm the transaction through Keychain.");
                    const customJsons = CALLERJSON.map((item) => {
                        var sendTo = "asimo";
                        if (item.type == "surf") 
                        {
                            //sendTo = "helios.burn"; 
                        } 
                        else if (item.type == "bee") 
                        {
                            //sendTo = "helios.bee";
                        } 
                        else if (item.type == "pob") 
                        {
                            //sendTo = "helios.pob";
                        }
                
                        return {
                            contractName: 'tokens',
                            contractAction: 'transfer',
                            contractPayload: {
                                to: sendTo,
                                symbol: item.symbol,
                                quantity: item.input,
                                memo: item.link
                            }
                        };
                    });
                    const customJsonArray = JSON.stringify(customJsons);
                
                    var myFuncAsync = (customJsonArray) => {
                        return new Promise((resolve, reject) => {
                            hive_keychain.requestCustomJson(callUser, "ssc-mainnet-hive", "Active", customJsonArray, "Send Tokens", (result, error) => {
                                if (error) 
                                {
                                    reject(new Error(error));
                                } 
                                else 
                                {
                                    resolve(result);
                                }
                            });
                        });
                    }
                
                    var asyncData = await myFuncAsync(customJsonArray);
                    if (asyncData["success"] == true) 
                    {
                        $("#loading").removeClass("d-none");
                        $("#loading").addClass("loading-style");
                        $("#status").text("Successfully Sent To Burn!");
                        $("#status").addClass("text-success");
                        await timeout(TIMEOUT);
                        buttonBurnTokens.setAttribute("disabled", "disabled");
                        $("#status").text("");
                        $("#status").removeClass("text-success");
                        $("#loading").addClass("d-none");
                        $("#loading").removeClass("loading-style");

                        updateBalance();
                        await removeSurfJson();                                                             
                        await updateSurfElements(); 
                        await removeBeeJson();                                                             
                        await updateBeeElements(); 
                        await removePobJson();                                                             
                        await updatePobElements();
                        await totalBurnTextInitiate();
                    } 
                    else 
                    {
                        $("#loading").removeClass("d-none");
                        $("#loading").removeClass("loading-style");                        
                        $("#status").text("Transaction failed, Please try again.");
                        await timeout(TIMEOUT);
                        $("#status").text("");
                        $("#loading").addClass("d-none");
                        $("#loading").removeClass("loading-style");
                    }
                } 
                catch (error) 
                {
                    console.log("Error at sendTransactions():", error);
                }
            };
            
            heliosBalanceInput.addEventListener("click", async function() {
                try
                {
                    const heliosBalText = heliosBalanceInput.textContent;
                    if(!inputSurfAvail.disabled && !buttonSurfAvail.disabled)
                    {
                        inputSurfAvail.value = heliosBalText;
                        buttonSurfAvail.value = "HELIOS";

                        var inputVal = inputSurfAvail.value;
                        var selectedOption = buttonSurfAvail.value;
                        await selectSurfSymbol(inputVal, selectedOption, buttonAddSurfAvail, surfAddSvg);
                        await removeSurfJson();
                    }
                }
                catch (error)
                {
                    console.log("Error at heliosBalanceInput.addEventListener() - click:", error);
                }
            });

            athonBalanceInput.addEventListener("click", async function() {
                try
                {
                    const athonBalText = athonBalanceInput.textContent;
                    if(!inputSurfAvail.disabled && !buttonSurfAvail.disabled)
                    {
                        inputSurfAvail.value = athonBalText;
                        buttonSurfAvail.value = "ATHON";

                        var inputVal = inputSurfAvail.value;
                        var selectedOption = buttonSurfAvail.value;
                        await selectSurfSymbol(inputVal, selectedOption, buttonAddSurfAvail, surfAddSvg);
                        await removeSurfJson();
                    }
                }
                catch (error)
                {
                    console.log("Error at athonBalanceInput.addEventListener() - click:", error);
                }
            });

            // Surf Validations Start Here

            inputSurfAvail.addEventListener("input", async function() {
                try
                {
                    var inputVal = inputSurfAvail.value;
                    await validateSurfPattern(inputVal);
                    
                    inputVal = parseFloat(inputVal) || 0.0;
                    await addSurfButton(inputVal, buttonAddSurfAvail, surfAddSvg);

                    await removeSurfJson();                    
                }
                catch (error)
                {
                    console.log("Error at inputSurfAvail.addEventListener() - input : ", error);
                }
            });

            buttonSurfAvail.addEventListener("change", async function() {
                try
                {
                    var inputVal = inputSurfAvail.value;
                    var selectedOption = buttonSurfAvail.value;
                    await selectSurfSymbol(inputVal, selectedOption, buttonAddSurfAvail, surfAddSvg);
                    await removeSurfJson();
                }
                catch (error)
                {
                    console.log("Error at buttonSurfAvail.addEventListener() - change : ", error);
                }
            });

            buttonAddSurfAvail.addEventListener("click", async function() {
                try
                {
                    surfAddSvg.style.fill = "#00e065";
                    buttonSurfAddRemove.removeAttribute("disabled");
                    buttonAddSurfAvail.setAttribute("disabled", "disabled");
                    await processSurfJson(usernameInput.value, inputSurfAvail.value, buttonSurfAvail.value, postLinkField.value); 
                    console.log("CALLERJSON : ", CALLERJSON); 
                    await burnButtonInitiate();
                    await totalBurnTextProcess();
                }
                catch (error)
                {
                    console.log("Error at buttonAddSurfAvail.addEventListener() - click : ", error);
                }
            });

            buttonSurfAddRemove.addEventListener("click", async function() {
                try
                {
                    surfAddSvg.removeAttribute("style");
                    // Remove the JSON object with type 'surf' from CALLERJSON
                    CALLERJSON = CALLERJSON.filter(function(json) {
                        return json.type !== "surf";
                    });
                    buttonAddSurfAvail.removeAttribute("disabled");
                    buttonSurfAddRemove.setAttribute("disabled", "disabled");
                    if(CALLERJSON.length <= 0)
                    {
                        await burnButtonDisabled();
                    }
                    console.log("CALLERJSON : ", CALLERJSON); 
                    await totalBurnTextProcess();
                }
                catch (error)
                {
                    console.log("Error at buttonPobAddRemove.addEventListener() - click : ", error);
                }
            });

            async function surfValidPost (postInfo) {
                try
                {
                    if(postInfo.surfStatus == true)
                    {
                        surfSvg.style.fill = "#00e065";
                        surfAvail.style.color = "#00e065";
                        inputSurfAvail.removeAttribute("disabled");
                        buttonSurfAvail.removeAttribute("disabled");
                    }
                    else
                    {
                        surfSvg.removeAttribute("style");
                        surfAvail.removeAttribute("style");
                        inputSurfAvail.value = "";  // Remove the text value
                        inputSurfAvail.setAttribute("disabled", "disabled");
                        buttonSurfAvail.value = "HELIOS";
                        buttonSurfAvail.setAttribute("disabled", "disabled");
                        buttonAddSurfAvail.setAttribute("disabled", "disabled");
                        surfAddSvg.removeAttribute("style");
                        buttonSurfAddRemove.setAttribute("disabled", "disabled"); 
                    }
                    await removeSurfJson();  
                }
                catch (error)
                {
                    console.log("Error at surfValidPost() : ", error);
                }
            };

            async function validateSurfPattern (price) {
                try
                {
                    var patt = /^(\d*)([.]\d{0,3})?$/;  
                    var matchedString = price.match(patt);
                    if (matchedString) 
                    {        
                        prevSurfValue = matchedString[1] + (matchedString[2] ? matchedString[2].replace(",", ".") : "");               
                    }
                    else
                    {
                        inputSurfAvail.value = prevSurfValue;
                    }
                }
                catch (error)
                {
                    console.log("Error at validateSurfPattern() : ", error);
                }
            };

            async function addSurfButton (inputVal, buttonAddSurfAvail, surfAddSvg) {
                try
                {
                    var tokenSymbol = buttonSurfAvail.value;
                    if(tokenSymbol == "HELIOS")
                    {
                        if(inputVal >= MINHELIOS)
                        {
                            buttonAddSurfAvail.removeAttribute("disabled");
                            surfAddSvg.removeAttribute("style");
                            buttonSurfAddRemove.setAttribute("disabled", "disabled"); 
                        }
                        else
                        {
                            buttonAddSurfAvail.setAttribute("disabled", "disabled");
                            surfAddSvg.removeAttribute("style");
                            buttonSurfAddRemove.setAttribute("disabled", "disabled"); 
                        }
                    }

                    if(tokenSymbol == "ATHON")
                    {
                        if(inputVal >= MINATH)
                        {
                            buttonAddSurfAvail.removeAttribute("disabled");
                            surfAddSvg.removeAttribute("style");
                            buttonSurfAddRemove.setAttribute("disabled", "disabled"); 
                        }
                        else
                        {
                            buttonAddSurfAvail.setAttribute("disabled", "disabled");
                            surfAddSvg.removeAttribute("style");
                            buttonSurfAddRemove.setAttribute("disabled", "disabled"); 
                        }
                    }
                }
                catch (error)
                {
                    console.log("Error at addSurfButton() : ", error);
                }
            };

            async function selectSurfSymbol (inputVal, selectedOption, buttonAddSurfAvail, surfAddSvg) {
                try
                {
                    if(selectedOption == "HELIOS")
                    {
                        if(inputVal >= MINHELIOS)
                        {
                            buttonAddSurfAvail.removeAttribute("disabled");
                            surfAddSvg.removeAttribute("style");
                            buttonSurfAddRemove.setAttribute("disabled", "disabled"); 
                        }
                        else
                        {
                            buttonAddSurfAvail.setAttribute("disabled", "disabled");
                            surfAddSvg.removeAttribute("style");
                            buttonSurfAddRemove.setAttribute("disabled", "disabled"); 
                        }
                    }

                    if(selectedOption == "ATHON")
                    {
                        if(inputVal >= MINATH)
                        {
                            buttonAddSurfAvail.removeAttribute("disabled");
                            surfAddSvg.removeAttribute("style");
                            buttonSurfAddRemove.setAttribute("disabled", "disabled"); 
                        }
                        else
                        {
                            buttonAddSurfAvail.setAttribute("disabled", "disabled");
                            surfAddSvg.removeAttribute("style");
                            buttonSurfAddRemove.setAttribute("disabled", "disabled"); 
                        }
                    }
                }
                catch (error)
                {
                    console.log("Error at selectSurfSymbol() : ", error);
                }
            };

            async function updateSurfElements () {
                try
                {
                    var postInfo = await postURL(postLinkField.value);                    
                    if(postInfo[0].surfStatus == true)
                    {
                        buttonAddSurfAvail.removeAttribute("disabled");
                        surfAddSvg.removeAttribute("style");
                        buttonSurfAddRemove.setAttribute("disabled", "disabled"); 
                    }
                    else
                    {
                        surfSvg.removeAttribute("style");
                        surfAvail.removeAttribute("style");
                        inputSurfAvail.value = "";  // Remove the text value
                        inputSurfAvail.setAttribute("disabled", "disabled");
                        buttonSurfAvail.value = "HELIOS";
                        buttonSurfAvail.setAttribute("disabled", "disabled");
                        buttonAddSurfAvail.setAttribute("disabled", "disabled");
                        surfAddSvg.removeAttribute("style"); 
                        buttonSurfAddRemove.setAttribute("disabled", "disabled"); 
                    }
                }
                catch (error)
                {
                    console.log("Error at updateSurfElements() : ", error);
                }
            };

            // Surf Validations End Here

            // Bee Validations Start Here

            inputBeeAvail.addEventListener("input", async function() {
                try
                {
                    var inputVal = inputBeeAvail.value;
                    await validateBeePattern(inputVal);
                    
                    inputVal = parseFloat(inputVal) || 0.0;
                    await addBeeButton(inputVal, buttonAddBeeAvail, beeAddSvg);

                    await removeBeeJson();
                }
                catch (error)
                {
                    console.log("Error at inputBeeAvail.addEventListener() - input : ", error);
                }
            });

            buttonBeeAvail.addEventListener("change", async function() {
                try
                {
                    var inputVal = inputBeeAvail.value;
                    var selectedOption = buttonBeeAvail.value;
                    await selectBeeSymbol(inputVal, selectedOption, buttonAddBeeAvail, beeAddSvg);
                    await removeBeeJson();
                }
                catch (error)
                {
                    console.log("Error at buttonBeeAvail.addEventListener() - change : ", error);
                }
            });

            buttonAddBeeAvail.addEventListener("click", async function() {
                try
                {
                    beeAddSvg.style.fill = "#00e065";
                    buttonBeeAddRemove.removeAttribute("disabled");
                    buttonAddBeeAvail.setAttribute("disabled", "disabled");
                    await processBeeJson(usernameInput.value, inputBeeAvail.value, buttonBeeAvail.value, postLinkField.value);
                    console.log("CALLERJSON : ", CALLERJSON); 
                    await burnButtonInitiate();
                    await totalBurnTextProcess();                    
                }
                catch (error)
                {
                    console.log("Error at buttonAddBeeAvail.addEventListener() - click : ", error);
                }
            });

            buttonBeeAddRemove.addEventListener("click", async function() {
                try
                {
                    beeAddSvg.removeAttribute("style");
                    // Remove the JSON object with type 'bee' from CALLERJSON
                    CALLERJSON = CALLERJSON.filter(function(json) {
                        return json.type !== "bee";
                    });
                    buttonAddBeeAvail.removeAttribute("disabled");
                    buttonBeeAddRemove.setAttribute("disabled", "disabled");
                    console.log("CALLERJSON : ", CALLERJSON); 
                    if(CALLERJSON.length <= 0)
                    {
                        await burnButtonDisabled();
                    }
                    await totalBurnTextProcess();
                }
                catch (error)
                {
                    console.log("Error at buttonPobAddRemove.addEventListener() - click : ", error);
                }
            });

            async function beeValidPost (postInfo) {
                try
                {
                    if(postInfo.beeStatus == true)
                    {
                        beeSvg.style.fill = "#00e065";
                        beeAvail.style.color = "#00e065";
                        inputBeeAvail.removeAttribute("disabled");
                        buttonBeeAvail.removeAttribute("disabled");
                    }
                    else
                    {
                        beeSvg.removeAttribute("style");
                        beeAvail.removeAttribute("style");
                        inputBeeAvail.value = "";  // Remove the text value
                        inputBeeAvail.setAttribute("disabled", "disabled");
                        buttonBeeAvail.value = "HELIOS";
                        buttonBeeAvail.setAttribute("disabled", "disabled");
                        buttonAddBeeAvail.setAttribute("disabled", "disabled");
                        beeAddSvg.removeAttribute("style"); 
                        buttonBeeAddRemove.setAttribute("disabled", "disabled");
                    }
                    await removeBeeJson();
                }
                catch (error)
                {
                    console.log("Error at beeValidPost() : ", error);
                }
            };

            async function validateBeePattern (price) {
                try
                {
                    var patt = /^(\d*)([.]\d{0,3})?$/;  
                    var matchedString = price.match(patt);
                    if (matchedString) 
                    {        
                        prevBeeValue = matchedString[1] + (matchedString[2] ? matchedString[2].replace(",", ".") : "");               
                    }
                    else
                    {
                        inputBeeAvail.value = prevBeeValue;
                    }
                }
                catch (error)
                {
                    console.log("Error at validateBeePattern() : ", error);
                }
            };

            async function addBeeButton (inputVal, buttonAddBeeAvail, beeAddSvg) {
                try
                {
                    var tokenSymbol = buttonBeeAvail.value;
                    if(tokenSymbol == "HELIOS")
                    {
                        if(inputVal >= MINHELIOS)
                        {
                            buttonAddBeeAvail.removeAttribute("disabled");
                            beeAddSvg.removeAttribute("style");
                            buttonBeeAddRemove.setAttribute("disabled", "disabled");
                        }
                        else
                        {
                            buttonAddBeeAvail.setAttribute("disabled", "disabled");
                            beeAddSvg.removeAttribute("style");
                            buttonBeeAddRemove.setAttribute("disabled", "disabled");
                        }
                    }

                    if(tokenSymbol == "ATHON")
                    {
                        if(inputVal >= MINATH)
                        {
                            buttonAddBeeAvail.removeAttribute("disabled");
                            beeAddSvg.removeAttribute("style");
                            buttonBeeAddRemove.setAttribute("disabled", "disabled");
                        }
                        else
                        {
                            buttonAddBeeAvail.setAttribute("disabled", "disabled");
                            beeAddSvg.removeAttribute("style");
                            buttonBeeAddRemove.setAttribute("disabled", "disabled");
                        }
                    }
                }
                catch (error)
                {
                    console.log("Error at addBeeButton() : ", error);
                }
            };

            async function selectBeeSymbol (inputVal, selectedOption, buttonAddBeeAvail, beeAddSvg) {
                try
                {
                    if(selectedOption == "HELIOS")
                    {
                        if(inputVal >= MINHELIOS)
                        {
                            buttonAddBeeAvail.removeAttribute("disabled");
                            beeAddSvg.removeAttribute("style");
                            buttonBeeAddRemove.setAttribute("disabled", "disabled");
                        }
                        else
                        {
                            buttonAddBeeAvail.setAttribute("disabled", "disabled");
                            beeAddSvg.removeAttribute("style");
                            buttonBeeAddRemove.setAttribute("disabled", "disabled");
                        }
                    }

                    if(selectedOption == "ATHON")
                    {
                        if(inputVal >= MINATH)
                        {
                            buttonAddBeeAvail.removeAttribute("disabled");
                            beeAddSvg.removeAttribute("style");
                            buttonBeeAddRemove.setAttribute("disabled", "disabled");
                        }
                        else
                        {
                            buttonAddBeeAvail.setAttribute("disabled", "disabled");
                            beeAddSvg.removeAttribute("style");
                            buttonBeeAddRemove.setAttribute("disabled", "disabled");
                        }
                    }
                }
                catch (error)
                {
                    console.log("Error at selectBeeSymbol() : ", error);
                }
            };

            async function updateBeeElements () {
                try
                {
                    var postInfo = await postURL(postLinkField.value);                    
                    if(postInfo[0].surfStatus == true)
                    {
                        buttonAddBeeAvail.removeAttribute("disabled");
                        beeAddSvg.removeAttribute("style");
                        buttonBeeAddRemove.setAttribute("disabled", "disabled");
                    }
                    else
                    {
                        beeSvg.removeAttribute("style");
                        beeAvail.removeAttribute("style");
                        inputBeeAvail.value = "";  // Remove the text value
                        inputBeeAvail.setAttribute("disabled", "disabled");
                        buttonBeeAvail.value = "HELIOS";
                        buttonBeeAvail.setAttribute("disabled", "disabled");
                        buttonAddBeeAvail.setAttribute("disabled", "disabled");
                        beeAddSvg.removeAttribute("style"); 
                        buttonBeeAddRemove.setAttribute("disabled", "disabled");
                    }
                }
                catch (error)
                {
                    console.log("Error at updateBeeElements() : ", error);
                }
            };

            // Bee Validations End Here

            // Pob Validations Start Here

            inputPobAvail.addEventListener("input", async function() {
                try
                {
                    var inputVal = inputPobAvail.value;
                    await validatePobPattern(inputVal);
                    
                    inputVal = parseFloat(inputVal) || 0.0;
                    await addPobButton(inputVal, buttonAddPobAvail, pobAddSvg);

                    await removePobJson();
                }
                catch (error)
                {
                    console.log("Error at inputPobAvail.addEventListener() - input : ", error);
                }
            });

            buttonPobAvail.addEventListener("change", async function() {
                try
                {
                    var inputVal = inputPobAvail.value;
                    var selectedOption = buttonPobAvail.value;
                    await selectPobSymbol(inputVal, selectedOption, buttonAddPobAvail, pobAddSvg);
                    await removePobJson();
                }
                catch (error)
                {
                    console.log("Error at buttonPobAvail.addEventListener() - change : ", error);
                }
            });

            buttonAddPobAvail.addEventListener("click", async function() {
                try
                {
                    pobAddSvg.style.fill = "#00e065";
                    buttonPobAddRemove.removeAttribute("disabled");
                    buttonAddPobAvail.setAttribute("disabled", "disabled");
                    await processPobJson(usernameInput.value, inputPobAvail.value, buttonPobAvail.value, postLinkField.value); 
                    console.log("CALLERJSON : ", CALLERJSON); 
                    await burnButtonInitiate();
                    await totalBurnTextProcess();                  
                }
                catch (error)
                {
                    console.log("Error at buttonAddPobAvail.addEventListener() - click : ", error);
                }
            });

            buttonPobAddRemove.addEventListener("click", async function() {
                try
                {
                    pobAddSvg.removeAttribute("style");
                    // Remove the JSON object with type 'pob' from CALLERJSON
                    CALLERJSON = CALLERJSON.filter(function(json) {
                        return json.type !== "pob";
                    });
                    buttonAddPobAvail.removeAttribute("disabled");
                    buttonPobAddRemove.setAttribute("disabled", "disabled");
                    console.log("CALLERJSON : ", CALLERJSON);
                    if(CALLERJSON.length <= 0)
                    {
                        await burnButtonDisabled();
                    } 
                    await totalBurnTextProcess();
                }
                catch (error)
                {
                    console.log("Error at buttonPobAddRemove.addEventListener() - click : ", error);
                }
            });

            async function pobValidPost (postInfo) {
                try
                {
                    if(postInfo.pobStatus == true)
                    {
                        pobSvg.style.fill = "#00e065";
                        pobAvail.style.color = "#00e065";
                        inputPobAvail.removeAttribute("disabled");
                        buttonPobAvail.removeAttribute("disabled");
                    }
                    else
                    {
                        pobSvg.removeAttribute("style");
                        pobAvail.removeAttribute("style");
                        inputPobAvail.value = "";  // Remove the text value
                        inputPobAvail.setAttribute("disabled", "disabled");
                        buttonPobAvail.value = "HELIOS";
                        buttonPobAvail.setAttribute("disabled", "disabled");
                        buttonAddPobAvail.setAttribute("disabled", "disabled");
                        pobAddSvg.removeAttribute("style"); 
                        buttonPobAddRemove.setAttribute("disabled", "disabled");
                    }
                    await removePobJson();
                }
                catch (error)
                {
                    console.log("Error at pobValidPost() : ", error);
                }
            };

            async function validatePobPattern (price) {
                try
                {
                    var patt = /^(\d*)([.]\d{0,3})?$/;  
                    var matchedString = price.match(patt);
                    if (matchedString) 
                    {        
                        prevPobValue = matchedString[1] + (matchedString[2] ? matchedString[2].replace(",", ".") : "");               
                    }
                    else
                    {
                        inputPobAvail.value = prevPobValue;
                    }
                }
                catch (error)
                {
                    console.log("Error at validatePobPattern() : ", error);
                }
            };

            async function addPobButton (inputVal, buttonAddPobAvail, pobAddSvg) {
                try
                {
                    var tokenSymbol = buttonPobAvail.value;
                    if(tokenSymbol == "HELIOS")
                    {
                        if(inputVal >= MINHELIOS)
                        {
                            buttonAddPobAvail.removeAttribute("disabled");
                            pobAddSvg.removeAttribute("style");
                            buttonPobAddRemove.setAttribute("disabled", "disabled");
                        }
                        else
                        {
                            buttonAddPobAvail.setAttribute("disabled", "disabled");
                            pobAddSvg.removeAttribute("style");
                            buttonPobAddRemove.setAttribute("disabled", "disabled");
                        }
                    }

                    if(tokenSymbol == "ATHON")
                    {
                        if(inputVal >= MINATH)
                        {
                            buttonAddPobAvail.removeAttribute("disabled");
                            pobAddSvg.removeAttribute("style");
                            buttonPobAddRemove.setAttribute("disabled", "disabled");
                        }
                        else
                        {
                            buttonAddPobAvail.setAttribute("disabled", "disabled");
                            pobAddSvg.removeAttribute("style");
                            buttonPobAddRemove.setAttribute("disabled", "disabled");
                        }
                    }
                }
                catch (error)
                {
                    console.log("Error at addPobButton() : ", error);
                }
            };

            async function selectPobSymbol (inputVal, selectedOption, buttonAddPobAvail, pobAddSvg) {
                try
                {
                    if(selectedOption == "HELIOS")
                    {
                        if(inputVal >= MINHELIOS)
                        {
                            buttonAddPobAvail.removeAttribute("disabled");
                            pobAddSvg.removeAttribute("style");
                            buttonPobAddRemove.setAttribute("disabled", "disabled");
                        }
                        else
                        {
                            buttonAddPobAvail.setAttribute("disabled", "disabled");
                            pobAddSvg.removeAttribute("style");
                            buttonPobAddRemove.setAttribute("disabled", "disabled");
                        }
                    }

                    if(selectedOption == "ATHON")
                    {
                        if(inputVal >= MINATH)
                        {
                            buttonAddPobAvail.removeAttribute("disabled");
                            pobAddSvg.removeAttribute("style");
                            buttonPobAddRemove.setAttribute("disabled", "disabled");
                        }
                        else
                        {
                            buttonAddPobAvail.setAttribute("disabled", "disabled");
                            pobAddSvg.removeAttribute("style");
                            buttonPobAddRemove.setAttribute("disabled", "disabled");
                        }
                    }
                }
                catch (error)
                {
                    console.log("Error at selectPobSymbol() : ", error);
                }
            };

            async function updatePobElements () {
                try
                {
                    var postInfo = await postURL(postLinkField.value);                    
                    if(postInfo[0].surfStatus == true)
                    {
                        buttonAddPobAvail.removeAttribute("disabled");
                        pobAddSvg.removeAttribute("style");
                        buttonPobAddRemove.setAttribute("disabled", "disabled");
                    }
                    else
                    {
                        pobSvg.removeAttribute("style");
                        pobAvail.removeAttribute("style");
                        inputPobAvail.value = "";  // Remove the text value
                        inputPobAvail.setAttribute("disabled", "disabled");
                        buttonPobAvail.value = "HELIOS";
                        buttonPobAvail.setAttribute("disabled", "disabled");
                        buttonAddPobAvail.setAttribute("disabled", "disabled");
                        pobAddSvg.removeAttribute("style"); 
                        buttonPobAddRemove.setAttribute("disabled", "disabled");
                    }
                }
                catch (error)
                {
                    console.log("Error at updatePobElements() : ", error);
                }
            };

            // Pob Validations End Here

            // Add To JSON

            async function processSurfJson (userName, inputVal, tokenSymbol, permLink) {
                try
                {
                    var updatedCallerJson = CALLERJSON.map(function(json) {
                        if (json.type === "surf") 
                        {
                            // Replace the existing JSON object with a new one
                            return { 
                                type: "surf",
                                username: userName,
                                input: inputVal,
                                symbol: tokenSymbol,
                                link: permLink  
                            };
                        } 
                        else 
                        {
                            // Keep the original JSON object
                            return json;
                        }
                    });

                    // Check if there was a JSON object with type 'surf' in CALLERJSON
                    var existingJsonIndex = CALLERJSON.findIndex(function(json) {
                        return json.type === "surf";
                    });

                    // If no existing JSON object was found, add a new one
                    if (existingJsonIndex === -1) {
                        var newJson ={ 
                            type: "surf",
                            username: userName,
                            input: inputVal,
                            symbol: tokenSymbol,
                            link: permLink  
                        };
                        updatedCallerJson.push(newJson);
                    }

                    // Assign the updated array back to CALLERJSON
                    CALLERJSON = updatedCallerJson;
                }
                catch (error)
                {
                    console.log("Error at processSurfJson() : ", error);
                }
            };

            async function removeSurfJson () {
                try
                {
                    // Remove the JSON object with type 'surf' from CALLERJSON
                    CALLERJSON = CALLERJSON.filter(function(json) {
                        return json.type !== "surf";
                    });

                    await burnButtonDisabled();
                }
                catch (error)
                {
                    console.log("Error at removeSurfJson() : ", error);
                }
            };

            async function processBeeJson (userName, inputVal, tokenSymbol, permLink) {
                try
                {
                    var updatedCallerJson = CALLERJSON.map(function(json) {
                        if (json.type === "bee") 
                        {
                            // Replace the existing JSON object with a new one
                            return { 
                                type: "bee",
                                username: userName,
                                input: inputVal,
                                symbol: tokenSymbol,
                                link: permLink  
                            };
                        } 
                        else 
                        {
                            // Keep the original JSON object
                            return json;
                        }
                    });

                    // Check if there was a JSON object with type 'surf' in CALLERJSON
                    var existingJsonIndex = CALLERJSON.findIndex(function(json) {
                        return json.type === "bee";
                    });

                    // If no existing JSON object was found, add a new one
                    if (existingJsonIndex === -1) {
                        var newJson ={ 
                            type: "bee",
                            username: userName,
                            input: inputVal,
                            symbol: tokenSymbol,
                            link: permLink  
                        };
                        updatedCallerJson.push(newJson);
                    }

                    // Assign the updated array back to CALLERJSON
                    CALLERJSON = updatedCallerJson;
                }
                catch (error)
                {
                    console.log("Error at processBeeJson() : ", error);
                }
            };

            async function removeBeeJson () {
                try
                {
                    // Remove the JSON object with type 'surf' from CALLERJSON
                    CALLERJSON = CALLERJSON.filter(function(json) {
                        return json.type !== "bee";
                    });

                    await burnButtonDisabled();
                }
                catch (error)
                {
                    console.log("Error at removeBeeJson() : ", error);
                }
            };

            async function processPobJson (userName, inputVal, tokenSymbol, permLink) {
                try
                {
                    var updatedCallerJson = CALLERJSON.map(function(json) {
                        if (json.type === "pob") 
                        {
                            // Replace the existing JSON object with a new one
                            return { 
                                type: "pob",
                                username: userName,
                                input: inputVal,
                                symbol: tokenSymbol,
                                link: permLink  
                            };
                        } 
                        else 
                        {
                            // Keep the original JSON object
                            return json;
                        }
                    });

                    // Check if there was a JSON object with type 'surf' in CALLERJSON
                    var existingJsonIndex = CALLERJSON.findIndex(function(json) {
                        return json.type === "pob";
                    });

                    // If no existing JSON object was found, add a new one
                    if (existingJsonIndex === -1) {
                        var newJson ={ 
                            type: "pob",
                            username: userName,
                            input: inputVal,
                            symbol: tokenSymbol,
                            link: permLink  
                        };
                        updatedCallerJson.push(newJson);
                    }

                    // Assign the updated array back to CALLERJSON
                    CALLERJSON = updatedCallerJson;
                }
                catch (error)
                {
                    console.log("Error at processPobJson() : ", error);
                }
            };

            async function removePobJson () {
                try
                {
                    // Remove the JSON object with type 'surf' from CALLERJSON
                    CALLERJSON = CALLERJSON.filter(function(json) {
                        return json.type !== "pob";
                    });

                    await burnButtonDisabled();
                }
                catch (error)
                {
                    console.log("Error at removePobJson() : ", error);
                }
            };

            async function burnButtonInitiate () {
                try
                {
                    var heliosAmount = 0.0, athonAmount = 0.0;
                    var heliosTotal = 0.0, athonTotal = 0.0;
                    var accStatus = await getAccountInfo(usernameInput.value);
                    if(accStatus == true)
                    {
                        const balHelios = await getTokenBalance(usernameInput.value, "HELIOS");                        
                        if(balHelios.length > 0)
                        {
                            heliosAmount = parseFloat(balHelios[0].balance) || 0.0;                            
                        }

                        const balAthon = await getTokenBalance(usernameInput.value, "ATH");                        
                        if(balAthon.length > 0)
                        {
                            athonAmount = parseFloat(balAthon[0].balance) || 0.0;
                        }

                        // Iterate over the CALLERJSON array
                        for (const json of CALLERJSON) 
                        {
                            // Check the type of the JSON element
                            if (json.symbol === "HELIOS") 
                            {
                                heliosTotal += parseFloat(json.input) || 0.0;
                            } 
                            else if (json.symbol === "ATHON") 
                            {
                                athonTotal += parseFloat(json.input) || 0.0;
                            } 
                        }

                        if(heliosAmount >= heliosTotal && athonAmount >= athonTotal)
                        {
                            buttonBurnTokens.removeAttribute("disabled");
                        }
                        else
                        {
                            await burnButtonDisabled();
                        }
                    }
                }
                catch (error)
                {
                    console.log("Error at burnButtonInitiate() : ", error);
                }
            };

            async function burnButtonDisabled () {
                buttonBurnTokens.setAttribute("disabled", "disabled");
                buttonBurnTokens.removeAttribute("style");
            };

            async function totalBurnTextProcess () {
                try
                {
                    var heliosTotal = 0.0, athonTotal = 0.0;
                    var estimateUSD = 0.0;
                    var heliosLastPrice = 0.0, heliosLastDayPrice = 0.0, heliosAvgPrice = 0.0;
                    var athonLastPrice = 0.0, athonLastDayPrice = 0.0, athonAvgPrice = 0.0;
                    $("#total_burn").text("0");
                    $("#burn_usd_val").text("$ 0");
                    for (const json of CALLERJSON) 
                    {
                        // Check the type of the JSON element
                        if (json.symbol === "HELIOS") 
                        {
                            heliosTotal += parseFloat(json.input) || 0.0;
                        } 
                        else if (json.symbol === "ATHON") 
                        {
                            athonTotal += parseFloat(json.input) || 0.0;
                        } 
                    }

                    var marketInfo = await getMarketInfo(["HELIOS", "ATH"]);
                    if(marketInfo.length > 0)
                    {
                        if(marketInfo[0].symbol == "HELIOS")
                        {
                            heliosLastPrice = parseFloat(marketInfo[0].lastPrice) || 0.0;
                            heliosLastDayPrice = parseFloat(marketInfo[0].lastDayPrice) || 0.0;
                            heliosAvgPrice = dec((heliosLastPrice + heliosLastDayPrice) / 2);
                        }

                        if(marketInfo[1].symbol == "ATH")
                        {
                            athonLastPrice = parseFloat(marketInfo[1].lastPrice) || 0.0;
                            athonLastDayPrice = parseFloat(marketInfo[1].lastDayPrice) || 0.0;
                            athonAvgPrice = dec((athonLastPrice + athonLastDayPrice) / 2);
                        }
                    }

                    const savedHivePrice = localStorage.getItem("hivePrice");
                    var hiveUSD = parseFloat(savedHivePrice);                
                    if (hiveUSD <= 0 || isNaN(hiveUSD)) 
                    {
                        hiveUSD = await getHiveUSD();
                    }

                    if (heliosTotal > 0.0 && athonTotal <= 0.0) 
                    {
                        estimateUSD = parseFloat(heliosTotal * heliosAvgPrice * hiveUSD) || 0.0;
                        $("#total_burn").text(heliosTotal + " HELIOS");
                        $("#burn_usd_val").text("$ " + estimateUSD.toFixed(3));
                    } 
                    else if (athonTotal > 0.0 && heliosTotal <= 0.0) 
                    {
                        estimateUSD = parseFloat(athonTotal * athonAvgPrice * hiveUSD) || 0.0;
                        $("#total_burn").text(athonTotal + " ATHON");
                        $("#burn_usd_val").text("$ " + estimateUSD.toFixed(3));
                    } 
                    else if (heliosTotal > 0.0 && athonTotal > 0.0) 
                    {
                        estimateUSD = parseFloat(((heliosTotal * heliosAvgPrice) + (athonTotal * athonAvgPrice)) * hiveUSD) || 0.0;
                        $("#total_burn").text(heliosTotal + " HELIOS & " + athonTotal + " ATHON");
                        $("#burn_usd_val").text("$ " + estimateUSD.toFixed(3));
                    }                    
                }
                catch (error)
                {
                    console.log("Error at totalBurnTextProcess() : ", error);
                }
            }; 

            async function totalBurnTextInitiate () {
                try
                {
                    $("#total_burn").text("0");
                    $("#burn_usd_val").text("$ 0");
                }
                catch (error)
                {
                    console.log("Error at totalBurnTextInitiate() : ", error);
                }
            };

            async function keyChainAvailability() {
                try 
                {
                    function requestHandshakeAsync() {
                        return new Promise((resolve, reject) => {
                            hive_keychain.requestHandshake(() => {
                                console.log('Handshake received!');
                                resolve(); // Resolve the promise when the handshake is complete
                            });
                        });
                    }                
                    await requestHandshakeAsync();
                    return true;
                } 
                catch (error) 
                {
                    console.log('Error at keyChainAvailability():', error);
                    return false;
                }
            };          
            
        }
        catch (error)
        {
            console.log("Error at actionTriggers() : ", error);
        }
    };
    
    async function postURL (post_link) {
        var postJson = [];
        var surfStatus = false, beeStatus = false, pobStatus = false;
        try
        {    
            const author = post_link.split("@")[1].split("/")[0];
            const link = post_link.split("@")[1].split("/")[1];            
            var postData = await hive.api.getContentAsync(author, link);            
            if(postData != null || Object.keys(postData).length !== 0)
            {               
                var postValidation = await isValid(postData);
                if(postValidation == true)
                {
                    surfStatus =  true;
                    var beeTagStatus = await checkBeeTags(postData);
                    if(beeTagStatus == true)
                    {
                        beeStatus = true;
                    }

                    var pobTagStatus = await checkPobTags(postData);
                    if(pobTagStatus == true)
                    {
                        pobStatus = true;
                    }
                }                
            }

            var ddata = {
                "surfStatus" : surfStatus,
                "beeStatus" : beeStatus,
                "pobStatus" : pobStatus
            }
            postJson.push(ddata);
            return postJson;
        }
        catch (error)
        {
            console.log("Error at postURL() : ", error);

            var ddata = {
                "surfStatus" : surfStatus,
                "beeStatus" : beeStatus,
                "pobStatus" : pobStatus
            }
            postJson.push(ddata);
            return postJson;
        }
    };

    async function checkBeeTags (postData) {
        var validStatus = false;
        try
        {
            const json_metadata = JSON.parse(postData.json_metadata);            
            if (json_metadata.tags.includes("tribes") || json_metadata.tags.includes("hive-engine")) 
            {                
                validStatus = true;
            }
            return validStatus;
        }
        catch (error)
        {
            console.log("Error at checkBeeTags() : ", error);
            return validStatus;
        }
    };

    async function checkPobTags (postData) {
        var validStatus = false;
        try
        {
            const json_metadata = JSON.parse(postData.json_metadata);            
            if (json_metadata.tags.includes("proofofbrain") || json_metadata.tags.includes("pob")) 
            {                
                validStatus = true;
            }
            return validStatus;
        }
        catch (error)
        {
            console.log("Error at checkPobTags() : ", error);
            return validStatus;
        }
    };

    async function isValid (postData) {
        var postValid = false;
        try
        {
            const valid_diffence = 18 * 60 * 60 * 1000;
            const { created } = postData;
            const created_timestamp = new Date(created).getTime();
            const current_timestamp = new Date().getTime();
            const diff = current_timestamp - created_timestamp;
            if (diff < valid_diffence) 
            {
                postValid = true;
            }
            return postValid;
        }
        catch (error)
        {
            console.log("Error at isValid() : ", error);
            return postValid;
        }
    };

    async function updateBalance() { 
        try
        {            
            var accStatus = await getAccountInfo(user);
            if(accStatus == true)
            {                 
                var balHelios = await getHeliosBalances(user);               
                $("#helios_bal").text(balHelios[0].heliosVal.toFixed(3));
                $("#helios_bal_value").text(balHelios[0].hiveVal);
                var balAthon = await getAthonBalances(user);        
                $("#athon_bal").text(balAthon[0].athonVal.toFixed(3));
                $("#athon_bal_value").text(balAthon[0].hiveVal);
            }
        }
        catch (error)
        {
            console.log("Error at updateBalance() : ", error);
        }
    };

    async function getAccountInfo (accountUser) {
        var accStatus = false;
        try
        {                                        
            const accData = await hive.api.getAccountsAsync([accountUser]);
            if(accData.length > 0)
            {
                accStatus = true;
            }
            return accStatus;
        }
        catch (error)
        {
            console.log("Error at getAccountInfo() : ", error);
            return accStatus;
        }
    };

    if (localStorage['user']) {
        $("#username").val(localStorage['user']);
        user = localStorage['user'];
        updateBalance();
    };    

    async function processAndSaveHivePrice() {
        try
        {
            async function saveHivePrice(hiveUSD) {
                try 
                {
                    // Save the hiveUSD value to Local Storage
                    localStorage.setItem("hivePrice", hiveUSD);
                    console.log("Hive price saved successfully : ", hiveUSD);
                } 
                catch (error) 
                {
                    console.log("Error at saveHivePrice() : ", error);
                }
            };
        
            async function processAndSave() {
                try 
                {
                    const hiveUSD = await getHiveUSD();                    
                    if(hiveUSD > 0.0)
                    {
                        await saveHivePrice(hiveUSD);
                    }
                } 
                catch (error) 
                {
                    console.log("Error at processAndSave() : ", error);
                }
            };
        
            // Process and save the hiveUSD price initially
            await processAndSave();
        
            // Schedule the processAndSave function to run every 5 minutes
            setInterval(processAndSave, 5 * 60 * 1000);
        }
        catch (error)
        {
            console.log("Error at processAndSaveHivePrice() : ", error);
        }
    };

    processAndSaveHivePrice(); 

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
});

async function getSelectedEndpoint() {
    var endpoint = await localStorage.getItem("selectedEndpoint");
    if (endpoint) 
    {
      return endpoint;
    } 
    else 
    {
      return "https://anyx.io";
    }
};

async function getSelectedEngEndpoint() {
    var endpoint = await localStorage.getItem("selectedEngEndpoint");
    if (endpoint) 
    {
      return endpoint;
    } 
    else 
    {
      return "https://engine.rishipanthee.com";
    }
};