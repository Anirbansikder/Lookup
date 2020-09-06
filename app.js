const search = document.getElementById('search');
const matchlist = document.getElementById('match-list');

const searchstates = async searchText => {
    const res = await fetch('data/cities.json');
    const states = await res.json();

    //Get matches To Current text input

    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi'); //global case insesnsetive
        return state.name.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchlist.innerHTML = '';
    }

    outputHTML(matches);
};

const outputHTML = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <div class="card card-body mb-2">
            <h4>${match.name} <span class="text-warning"><strong>${match.state}</strong></span> </h4>
        </div>
        `).join('');

        matchlist.innerHTML = html;
    }
}

search.addEventListener('input', () => searchstates(search.value));