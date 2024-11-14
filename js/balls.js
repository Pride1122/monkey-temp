$(document).ready(function () {
    const tiers = {
        diamond: 120,
        gold: 90,
        silver: 60,
        bronze: 30,
    }
    var totalSent = 0;
    var uniqueReceivers = 0;
    var onboards = 0;
    var totalBalled = 0;
    var totalBallers = 0;
    var percentBalled = 0;
    var totalSupply = 1000000000 - 73069509;
    var rewards = []; // Define rewards based on the rank, ensure it's defined
    var doxxedWallets = {
        "0xd319d4dd24cdb171a32015a527276aaa6fd4cb4b": "Petoshi",
        "0xc46346191f8fe043389144e934de0c7aab89c122": "Petoshi",
        "0xfd4411d58f25876f80e31e40bd8a291dec3f7e67": "Grif",
        "0x35055950f4fcbf13bee4b9d97a4ca9eb8941a411": "Ben",
        "0x803eab9ecd5c7d6595986bc1f1512f70afaeb090": "Grill God",
        "0x20870802ffe87bde482866296f7a14d136d1a06d": "Slim23",
        "0x0D3EBcaC14fed9cF0528dF7377372757c53643c6": "Marketing",
        "0x24dd7f8b38d9c3ca6d6a8db57c63b9819e541c58": "Hamza"
    };
    
    // Utility function
    function formatAmount(amount) {
        if (amount >= 1000000) {
            return (amount / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
        }
        if (amount >= 1000) {
            return (amount / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return amount.toString();
    }
    
    // get /ball_holders
    fetch('/ball_holders?cache=0')
        .then(response => response.json())
        .then(data => {
            let leaderboardEntries = '';
            data.forEach((entry, index) => {
                totalBalled += entry.amount;
                totalBallers += 1;

                let link = `https://basescan.org/address/${entry.address}`;
                let addressHTML =
                    `<a class="leaderboard-item address" target="_blank" href="${link}">${entry.address}</a>`;
                if(entry.address.toLowerCase() in doxxedWallets){
                    entry.address = doxxedWallets[entry.address.toLowerCase()];
                    addressHTML = `<a class="leaderboard-item address" target="_blank" href="${link}">${entry.address}</a>`;
                }else if (entry.address !== entry.ens_name && entry.ens_name !== null && entry.ens_name.length < 36) {
                        addressHTML =
                            `<a class="leaderboard-item address" target="_blank" href="${link}">${entry.ens_name}</a>`;
                    }else if (entry.address.length > 36) {
                        
                        entry.address =
                            `${entry.address.slice(0, 4)}...${entry.address.slice(-4)}`;
                        addressHTML =
                            `<a class="leaderboard-item address" target="_blank" href="${link}">${entry.address}</a>`;
                        
                    }

                    leaderboardEntries += `
                    <div class="leaderboard-entry">
                        <a class="leaderboard-item rank">${index + 1}</a>
                        ${addressHTML}
                        <a class="leaderboard-item days">${entry.held_since}</a>
                        <a class="leaderboard-item amount">${formatAmount(entry.amount)}</a>
                    </div>`;
            });
            $('#leaderboard-entries').html(leaderboardEntries);
            // Update the totals section
            $('#totalBalled').text(formatAmount(totalBalled));
            $('#totalBallers').text(totalBallers);
        })
        .catch(error => {
            console.error('Error fetching leaderboard data:', error);
        });

        //#submitAddress on click
    $('#submitAddress').click(function () {
        // change button text to "Submitting..."
        $('#submitAddress').text('Submitting...');
        // get value from addressInput
        let address = $('#addressInput').val();
        // make sure it's an ethereum address
        if (address.length != 42 || address.slice(0, 2) != '0x') {
            swal.fire({
                icon: 'error',
                title: 'Invalid Address',
                text: 'Please enter a valid Ethereum address'
            });
            return
        }
        // post to /ball_submission
        fetch('/ball_submission?cache=0', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: address
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.error
                    });
                } else if (data.added == true) {
                     // add ability to refresh page to see new results
                    swal.fire({
                        icon: 'success',
                        title: 'Success',
                        confirmButtonText: 'Refresh Page',
                        text: `You've Diamond Balled ${data.tokenBalance} Boomer for ${data.daysSince} days! Address added to the leaderboard, please refresh!`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });

                } else {
                   
                    swal.fire({
                        icon: 'info',
                        title: 'No Action Taken',
                        text: 'This address does not meet the minimum requirements to be added to the leaderboard, must have 100k Boomer and held for over 14 days'
                    })
                }
                // change button text back to "Submit"
                $('#submitAddress').text('Submit');
                // empty the input field
                $('#addressInput').val('');
            })
            .catch(error => {
                console.error('Error submitting address:', error);
                $('#submitAddress').text('Submit');
            });
    });

});

// Example function to add leaderboard entries dynamically
function addLeaderboardEntry(rank, address, days, amount) {
    const entriesContainer = document.getElementById('leaderboard-entries');

    const entry = document.createElement('div');
    entry.classList.add('leaderboard-entry');

    const rankDiv = document.createElement('div');
    rankDiv.classList.add('rank');
    rankDiv.textContent = rank;

    const addressDiv = document.createElement('div');
    addressDiv.classList.add('address');
    addressDiv.textContent = address;

    const daysDiv = document.createElement('div');
    daysDiv.classList.add('days');
    daysDiv.textContent = days;

    const amountDiv = document.createElement('div');
    amountDiv.classList.add('amount');
    amountDiv.textContent = formatAmount(amount);

    entry.appendChild(rankDiv);
    entry.appendChild(addressDiv);
    entry.appendChild(daysDiv);
    entry.appendChild(amountDiv);

    entriesContainer.appendChild(entry);
}
