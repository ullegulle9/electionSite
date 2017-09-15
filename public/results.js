const voteList = document.getElementById("voteList");
const vasaList = document.getElementById("Vasa");
const masthuggList = document.getElementById("Masthugg");
const gardstenList = document.getElementById("Gardsten");
const kortedalaList = document.getElementById("Kortedala");
const totalVotes = document.getElementById("totalVotes");
const totalList = document.getElementById("totalStats");




socket.on("Votes", data => {
	let tr = document.createElement('tr');
	voteList.appendChild(tr);
	let td1 = document.createElement('td');
	let td2 = document.createElement('td');
	let td3 = document.createElement('td');
	td1.innerHTML = `${data.district}`;
	td2.innerHTML = `${data.politicalParty}`;
	td3.innerHTML = `${data.amountOfVotes}`;
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
});



socket.on("History", data => {
	if (data.length > 0) {
		vasaList.innerHTML = '';
		masthuggList.innerHTML = '';
		gardstenList.innerHTML = '';
		kortedalaList.innerHTML = '';
		totalList.innerHTML = '';
		const idList = ['Vasa', 'Masthugg', 'Gardsten', 'Kortedala'];
		let vasaTotal = 0;
		let masthuggTotal = 0;
		let gardstenTotal = 0;
		let kortedalaTotal = 0;
		let tTotal = 0;
		let partyList = [];


		for (let o in data) {
			function findParty(el) {
				return el.party === data[o].politicalParty;
			}
			switch (data[o].district) {
				case 'Vasakyrkan':
					vasaTotal += Number(data[o].amountOfVotes);
					tTotal += Number(data[o].amountOfVotes);

					if (partyList.find(findParty) === undefined) {
						partyList.push({
							party: data[o].politicalParty,
							votes: Number(data[o].amountOfVotes)
						})
					} else {
						partyList.forEach(x => {
							if (x.party === data[o].politicalParty){
								x.votes += Number(data[o].amountOfVotes);
							}
						})
					}
					break;
				case 'Masthuggskyrkan':
					masthuggTotal += Number(data[o].amountOfVotes);
					tTotal += Number(data[o].amountOfVotes);
					if (partyList.find(findParty) === undefined) {
						partyList.push({
							party: data[o].politicalParty,
							votes: Number(data[o].amountOfVotes)
						})
					} else {
						partyList.forEach(x => {
							if (x.party === data[o].politicalParty){
								x.votes += Number(data[o].amountOfVotes);
							}
						})
					}
					break;
				case 'Gårdstenskyrkan':
					gardstenTotal += Number(data[o].amountOfVotes);
					tTotal += Number(data[o].amountOfVotes);
					if (partyList.find(findParty) === undefined) {
						partyList.push({
							party: data[o].politicalParty,
							votes: Number(data[o].amountOfVotes)
						})
					} else {
						partyList.forEach(x => {
							if (x.party === data[o].politicalParty){
								x.votes += Number(data[o].amountOfVotes);
							}
						})
					}
					break;
				case 'Kortedala kyrka':
					kortedalaTotal += Number(data[o].amountOfVotes);
					tTotal += Number(data[o].amountOfVotes);
					if (partyList.find(findParty) === undefined) {
						partyList.push({
							party: data[o].politicalParty,
							votes: Number(data[o].amountOfVotes)
						})
					} else {
						partyList.forEach(x => {
							if (x.party === data[o].politicalParty){
								x.votes += Number(data[o].amountOfVotes);
							}
						})
					}
					break;
			}
		}

		for (let o in data) {
			let tr = document.createElement('tr');
			let td1 = document.createElement('td');
			let td2 = document.createElement('td');
			let td3 = document.createElement('td');
			switch (data[o].district) {
				case 'Vasakyrkan':
					vasaList.appendChild(tr);
					td1.innerHTML = `${data[o].politicalParty}`;
					td2.innerHTML = `${data[o].amountOfVotes}`;
					td3.innerHTML = `${percentage(data[o].amountOfVotes, vasaTotal)}%`;
					tr.appendChild(td1);
					tr.appendChild(td2);
					tr.appendChild(td3);
					break;
				case 'Masthuggskyrkan':
					masthuggList.appendChild(tr);
					td1.innerHTML = `${data[o].politicalParty}`;
					td2.innerHTML = `${data[o].amountOfVotes}`;
					td3.innerHTML = `${percentage(data[o].amountOfVotes, masthuggTotal)}%`;
					tr.appendChild(td1);
					tr.appendChild(td2);
					tr.appendChild(td3);
					break;
				case 'Gårdstenskyrkan':
					gardstenList.appendChild(tr);
					td1.innerHTML = `${data[o].politicalParty}`;
					td2.innerHTML = `${data[o].amountOfVotes}`;
					td3.innerHTML = `${percentage(data[o].amountOfVotes, gardstenTotal)}%`;
					tr.appendChild(td1);
					tr.appendChild(td2);
					tr.appendChild(td3);
					break;
				case 'Kortedala kyrka':
					kortedalaList.appendChild(tr);
					td1.innerHTML = `${data[o].politicalParty}`;
					td2.innerHTML = `${data[o].amountOfVotes}`;
					td3.innerHTML = `${percentage(data[o].amountOfVotes, kortedalaTotal)}%`;
					tr.appendChild(td1);
					tr.appendChild(td2);
					tr.appendChild(td3);
					break;
			}
		}

		for (let o in partyList) {
			let ttr = document.createElement('tr');
			totalList.appendChild(ttr);
			let ttd1 = document.createElement('td');
			let ttd2 = document.createElement('td');
			let ttd3 = document.createElement('td');
			ttd1.innerHTML = `${partyList[o].party}`;
			ttd2.innerHTML = `${partyList[o].votes}`;
			ttd3.innerHTML = `${percentage(partyList[o].votes, tTotal)}%`;
			ttr.appendChild(ttd1);
			ttr.appendChild(ttd2);
			ttr.appendChild(ttd3);
		}

		idList.forEach(church => {
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			td.colSpan = '3';
			switch (church) {
				case 'Vasa':
					vasaList.appendChild(tr);
					td.innerHTML = `Totalt antal röster: ${vasaTotal}`;
					tr.appendChild(td);
					break;
				case 'Masthugg':
					masthuggList.appendChild(tr);
					td.innerHTML = `Totalt antal röster: ${masthuggTotal}`;
					tr.appendChild(td);
					break;
				case 'Gardsten':
					gardstenList.appendChild(tr);
					td.innerHTML = `Totalt antal röster: ${gardstenTotal}`;
					tr.appendChild(td);
					break;
				case 'Kortedala':
					kortedalaList.appendChild(tr);
					td.innerHTML = `Totalt antal röster: ${kortedalaTotal}`;
					tr.appendChild(td);
					break;
			}
		})
		totalVotes.innerHTML = `Totalt antal inrapporterade röster: ${tTotal}`;

	}
})



function percentage(votes, total) {
	return Number((votes / total) * 100).toFixed(1);
}
