const url = "https://localhost:5443/sales/"

export const openSale = (refId, p_ag_id, setSale)=>{
    fetch(url + "create_sale", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ ref_id: refId, p_ag_id: p_ag_id })
    })
        .then(response=>{
            if(response.status === 200)
                return response.json()
            else
                alert("Something is wrong with the server!");
        })
        .then(data=>{
            if(data)
                setSale(data)
        })
        .catch(err=>{
            alert("Something is wrong with the server!");
        })
}

export const add_reference_for_discount = (ref_id, update_discount)=>{
    fetch(url + "add_reference", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ref_id: ref_id}),
        credentials: "include"
    })
        .then(response=>{
            if(response.status === 202)
                return response.json()
        })
        .then(data=>{
            if(data)
                update_discount(data)
        })
        .catch(err=>{
            console.log(err);
        })
}

export const confirm_sale = (ref_id, upFront, remaining, months)=>{
    fetch(url + "finish_creation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ref_id: ref_id, amount: upFront, remaining: remaining, months: months}),
        credentials: 'include'
    })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'contract.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(error => console.error('Error downloading PDF:', error));
}
