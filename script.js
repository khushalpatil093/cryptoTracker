let data = [];

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then(response => response.json())
.then(dataresponse => {
    data = dataresponse;
    console.log(data);
    // call display function
    renderData(data);
})
.catch(
    error => console.error('Error: ',error)
)

// display function
function renderData(data) {
    console.log(data);
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML="";
    data.forEach(item => {
        const row=document.createElement('tr');
        const percentageChange = item.price_change_percentage_24h;
        const percentageChangeClass= percentageChange>=0?'positiveChange':'negativeChange';

        row.innerHTML = `
        <td id="data1"> <img src="${item.image}" alt="${item.name}" width="20"> </td>
        <td>${item.name}</td>
        <td>${item.symbol}</td>
        <td>${item.id}</td>
        <td>${"$"+item.current_price}</td>
        <td class="${percentageChangeClass}">${item.price_change_percentage_24h}</td>
        <td>${"Mkt Cap : $"+item.total_volume}</td>
        `
        tableBody.appendChild(row);

    });
}

// search function
document.getElementById("searchbox").addEventListener('keyup', event => {
    const searchInput = document.getElementById('searchbox').value.trim().toLowerCase();
    if(searchInput=='') {
        renderData(data);
        return;
    }

    const filterData = data.filter(item => {
        const itemName=item.name.toLowerCase();
        const itemSymbol=item.symbol.toLowerCase();
        return itemName.includes(searchInput) || itemSymbol.includes(searchInput);
    })

    renderData(filterData);
})


// sort function 1
document.getElementById("mktcap").addEventListener('click', () => {
    data.sort((a,b)=>b.total_volume-a.total_volume);
    renderData(data);
})

// sort function 2
document.getElementById("percentage").addEventListener('click', () => {
    data.sort((a,b)=>b.price_change_percentage_24h-a.price_change_percentage_24h);
    renderData(data);
})