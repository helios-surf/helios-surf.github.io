$(window).bind("load", function() {

    // remove unnessary parameters from url

    window.history.replaceState({}, document.title, "/" + "");



    const ssc = new SSC("https://engine.rishipanthee.com/");

    var user = null, bal = { HELIOS: 0, VALUE: 0 }, marketvalues;

    const min = {

        HELIOS: 5

    };



    function dec(val) {

        return Math.floor(val * 1000) / 1000;

    }



    // async function getBridge () {

    //     const res = await hive.api.getAccountsAsync(['hiveupme']);

    //     const res2 = await ssc.findOne("tokens", "balances", { account: 'hiveupme', symbol: 'SWAP.HIVE' });

    //     $("#hive_liq").text(parseInt(res[0].balance.split(" ")[0]));

    //     $("#swap_liq").text(parseInt(res2.balance));

    //     $("#bridge").removeClass("d-none");

    // }

    

    // getBridge();


    async function getHistory () {
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
                <tr style="font-size:20px">
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
            $("#history").append(html);
        });

        // show history table
        $("#historycard").removeClass("d-none");
        // add flex
        $("#historycard").addClass("d-flex");
    }

    getHistory();

    // on clicke refresh history button
    $("#refreshHistory").click(() => {
        // empty history table
        $("#history").empty();
        getHistory();
    });


    async function getBalances (account) {

        const res = await hive.api.getAccountsAsync([account]);

        if (res.length > 0) {

            const res2 = await ssc.find("tokens", "balances", { account, symbol: "HELIOS" }, 1000, 0, []);

            var helios = res2.find(el => el.symbol === "HELIOS");

            if (res2.length > 0) {

                var val = (parseFloat(helios.balance) * parseFloat(marketvalues.HELIOS.lastPrice)) * parseFloat(marketvalues.HIVE);

                return {

                    HELIOS: dec(parseFloat((helios) ? helios.balance : 0)),

                    VALUE: parseFloat(val).toFixed(8)

                }

            } else return { HELIOS: 0, VALUE: 0 };

        } else return { HELIOS: 0, VALUE: 0 };

    }



    async function getMarket (symbols) {

        const res = await ssc.find("market", "metrics", { symbol: { "$in": [...symbols] } }, 1000, 0, []);

        const { data } = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=hive&vs_currencies=usd");

        var HELIOS = res.find(el => el.symbol === "HELIOS");

        return {

            HIVE: data.hive.usd,

            HELIOS,

        }

    }



    async function refresh () {

        marketvalues = await getMarket(["HELIOS"]);

        $("#helios_price").text(marketvalues.HELIOS.lastPrice);

        $("#helios_value").text((marketvalues.HELIOS.lastPrice * marketvalues.HIVE).toFixed(8));

        $("#helios_vol").text((marketvalues.HELIOS.volume * marketvalues.HIVE).toFixed(8));

        $("#helios_change").text(marketvalues.HELIOS.priceChangePercent);

    };



    $("#refresh").click(async function () {

        $(this).attr("disabled", true);

        await refresh();

        $(this).removeAttr("disabled");

    });



    async function updateBurn(r) {

        try {

            const symbol = $("#input").val();

            const val = $("#inputquantity").val();

            const post_link = $("#post").val();



            const {

                lastPrice,

                lastDayPrice

            } = marketvalues[symbol];

            let es_val = (parseFloat(lastPrice) + parseFloat(lastDayPrice)) / 2;

            es_val *= marketvalues.HIVE;

            es_val *= val;

            es_val = dec(es_val);

            $("#es_val").text(`$ ${es_val}`);



            function isMin(val) {

                if (val >= min[symbol]) return true;

                else return false;

            }



            if (isMin(val)

                && bal[symbol] >= val

                && post_link.length > 0

                ) {

                $("#swap").removeAttr("disabled");

                if (r) r(true, parseFloat(val).toFixed(3), symbol, post_link);

            } else {

                $("#swap").attr("disabled", "true");

                if (r) r(false, 0, 0, comment);

            }

        } catch (e) {

            console.log(e);

        }

    }



    $(".s").click(function () {

        $("#input").val($(this).find(".sym").text());

        $("#inputquantity").val($(this).find(".qt").text());

        updateBurn();

    });



    $("#inputquantity").keyup(() => { updateBurn(); });

    $("#input").change(() => { updateBurn(); });

    $("#post").keyup(() => { updateBurn(); });



    async function updateBalance() {

        marketvalues = await getMarket(["HELIOS"]);

        bal = await getBalances(user);



        $("#helios").text(bal.HELIOS.toFixed(3));

        $("#helios_bal_value").text(bal.VALUE);

    }



    $("#checkbalance").click(async function() {

        user = $.trim($("#username").val().toLowerCase());

        if (user.length >= 3) {

            $(this).attr("disabled", "true");

            await updateBalance();

            updateBurn();

            $(this).removeAttr("disabled");

            localStorage['user'] = user;

        }

    });



    if (localStorage['user']) {

        $("#username").val(localStorage['user']);

        user = localStorage['user'];

        updateBalance();

    }



    function isValid (post) {

        const valid_diffence = 18 * 60 * 60 * 1000;

        const { created } = post;

        const created_timestamp = new Date(created).getTime();

        const current_timestamp = new Date().getTime();

        const diff = current_timestamp - created_timestamp;



        if (diff > valid_diffence) return false;

        else return true;

    }



    $("#swap").click(async function () {

        $("#swap").attr("disabled", "true");

        $("#loading").removeClass("d-none");

        $("#status").text("Please Wait...");

        await refresh();

        await updateBalance();

        updateBurn(async function(canBurn, amount, currency, post_link) {

            if (canBurn) {

                $("#swap").attr("disabled", "true");



                let post = false;

                try {

                    const author = post_link.split("@")[1].split("/")[0];

                    const link = post_link.split("@")[1].split("/")[1];

                    post = await hive.api.getContentAsync(author, link);

                    if (!post.created) throw error;

                } catch (e) {

                    $("#status").text("Invalid Post Link");

                    $("#swap").removeAttr("disabled");

                    $("#loading").addClass("d-none");

                    return;

                }

    

                if (!post) {

                    $("#status").text("Invalid Post Link");

                    $("#swap").removeAttr("disabled");

                    $("#loading").addClass("d-none");

                    return;

                }



                if (!isValid(post)) {

                    $("#status").text("Post is older than 18 hours");

                    $("#loading").addClass("d-none");

                    $("#swap").removeAttr("disabled");

                    return;

                };



                $("#loading").addClass("d-none");

                $("#status").text(`Confirm the transaction through Keychain.`);



                try {

                    hive_keychain.requestHandshake();

                } catch (e) {

                    $("#loading").addClass("d-none");

                    $("#status").text("No method of transaction available, Install Keychain.");

                    updateBurn();

                }

                

                if (currency === "HELIOS") {

                    hive_keychain.requestSendToken(

                        user,

                        "helios.burn",

                        amount,

                        post_link,

                        currency,

                        async function (res) {

                            if (res.success === true) {

                                $("#status").text("Successfully Sent To Burn!");

                                $("#status").addClass("text-success");

                                await updateBalance();

                                updateBurn();

                            } else {

                                $("#status").text("Transaction failed, Please try again.");

                                updateBurn();

                            }

                            console.log(res);

                        }

                    );

                }

            } else {

                $("#loading").addClass("d-none");

                $("#status").text('Account balance updated, Try Again.');

                updateBurn();

            }

        });

    });



    refresh();

    // setInterval(() => { refresh(); updateBalance(); }, 5000);

});