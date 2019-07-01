function displayResults(responseJson, handle) {
    console.log(responseJson);
    $('#resultHeader').append(
        `<h2>Repo list for git handle: ${handle}</h2>`
    );
    for (let i=0; i < responseJson.length; i++) {
        $('#resultsList').append(
            `<li><p>${responseJson[i].name}</p>
            <a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].html_url}</a></li>`
        );
    };
    $('#results').removeClass('hidden');
}

function getRepos(handle) {
    fetch(`https://api.github.com/users/${handle}/repos`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, handle))
    .catch(error => {
        $('#errorMessage').text(`Something went wrong: ${error.message}`);
    });
}

function runPage() {
    $('form').submit(event => {
        event.preventDefault();
        $('#resultHeader').empty();
        $('#resultsList').empty();
        $('#errorMessage').empty();
        const searchHandle = $('input').val();
        getRepos(searchHandle);
    });
}

$(runPage);