let occupation_dropdown = document.getElementById("occupation") 
    let state_dropdown = document.getElementById("state")
    occupation_dropdown.length = state_dropdown.length = 0

    // add the default option to occupation drop down
    let occupation_defaultOption = document.createElement('option')
    occupation_defaultOption.text = 'Choose Occupation'
    occupation_dropdown.add(occupation_defaultOption)
    occupation_dropdown.selectedIndex = 0

    // add the default option to occupation state down
    let state_defaultOption = document.createElement('option')
    state_defaultOption.text = 'Choose State'
    state_dropdown.add(state_defaultOption)
    state_dropdown.selectedIndex = 0

    const url = 'https://frontend-take-home.fetchrewards.com/form'

    document.getElementById("hw_form").addEventListener('submit', submitAndListen)

    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.send()

    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText)
            const objectToArray = data => {
                const keys = Object.keys(data)
                const res = []
                for (let i = 0; i < keys.length; i++) {
                    res.push(data[keys[i]])
                };
                return res
            };
            const dataArray = objectToArray(data)

            let option
            // add options to occupations dropdown
            for (let i = 0; i < dataArray[0].length; i++) {
                option = document.createElement('option')
                option.text = dataArray[0][i]
                occupation_dropdown.add(option)

            }

            // add options to the states dropdown
            for (let i = 0; i < dataArray[1].length; i++) {
                option = document.createElement('option')
                option.text = dataArray[1][i].name
                option.value = dataArray[1][i].abbreviation
                state_dropdown.add(option)

            }
        } else {
            // reached the server, but it returned an error
            console.log(request.status)
        }
    }

    function submitAndListen() {
        const formAsObject = {
            "name": getValueFromElementWithID("name"),
            "email": getValueFromElementWithID("email"),
            "password": getValueFromElementWithID("password"),
            "occupation": getValueFromElementWithID("occupation"),
            "state": getValueFromElementWithID("state")
        }
        const request = new XMLHttpRequest()
        request.open('POST', url, true)
        request.setRequestHeader('Content-Type', 'application/json')
        request.send(JSON.stringify(formAsObject))

        if (request.status != 200) { // analyze HTTP status of the response
            alert(`Error ${request.status}: ${request.statusText}`) // e.g. 404: Not Found
        } else { // show the result
            alert(`Done, got ${request.response}`) // response is the server response
        }
        successMessage.classList.add('show');
        setTimeout(() => formAsObject.submit(), 2000);
    }

    function getValueFromElementWithID(id_attribute) {
        return document.getElementById(id_attribute).value
    }