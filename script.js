let close = document.getElementById("close")
document.getElementById("form").addEventListener("submit", async function (event) {
    event.preventDefault()

    const UserForm = event.target;
    const firstName = UserForm.fName.value;
    
    const lastName = UserForm.lName.value;
    const email = UserForm.email.value;
    const pincode = UserForm.pincode.value;
    const userDataDiv = document.getElementById("user-data-div")
    const delivaryDiv = document.getElementById('delivary-data-div');
    console.log(firstName,lastName,email,pincode)

    let officesData;

    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();

        if (data[0].Status === "Success") {
            const delivaryOffices = await data[0].PostOffice.map(office => {
                if (office.DeliveryStatus !== "Delivery") {
                    return `<li><p class="not-del">${office.Name} - ${office.DeliveryStatus}</p></li>`;
                }
                else {
                    return `<li><p>${office.Name} - ${office.DeliveryStatus}</p></li>`;
                }
            }).join('');
            console.log(delivaryOffices)
            officesData = `<ul class="ol">${delivaryOffices}</ul>`;
            
        } else {
            officesData = `<p class="not-del">${data[0].Message} -- No locations for delivary</p>`;
         }
        } catch (error) {
            officesData = `<p class="not-del">There was an error fetching the data.</p>`;
            
    }

    let pop = document.getElementById("pop-up")
    pop.classList.toggle("show")

    let userDetails = `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pincode:</strong> ${pincode}</p>
    `;

    userDataDiv.innerHTML = userDetails
    
    delivaryDiv.innerHTML = officesData
    
    


    
    
})


close.onclick = function () {
    let pop = document.getElementById("pop-up")
    pop.classList.toggle("show")
}
