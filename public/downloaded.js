window.addEventListener("load", (e) => { //showing list of downloaded files
    e.preventDefault();
        fetch('/downloaded', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
        })
            .then (res=>res.json()).then(res=> {
            if (res.error) {
                alert(res.error)
            }
            else {
                    for(let i = 0; i< res.keys.length; i++){
                        document.getElementById('key').innerHTML += "<br> "+ (i+1) +") "+res.keys[i] + "     ";
                    }
            }
        })
});
