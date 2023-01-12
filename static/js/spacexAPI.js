const misionesUrl = "https://api.spacexdata.com/v3/missions";

const lanzamientosUrl = "https://api.spacexdata.com/v3/launches";

fetch(misionesUrl)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("misiones");

        for(var d of data){
            container.innerHTML = `
                ${container.innerHTML}
                <div class="col">
                <div class="card">
                    <div class="card-block">
                    </div>
                    <div class="card-body">
                        <h2 class="card-title">${d.mission_name}</h2>
                        <h3 class="card-text">${d.mission_id}</h3>

                        <p class="card-text">${d.description}</p>
                    </div>
                    <div class="card-footer">
                        <div class="card-block">
                            <a href="${d.wikipedia}" class="card-link">${d.wikipedia}</a>
                        </div>
                        <div class="card-block">
                            <a href="${d.website}" class="card-link">${d.website}</a>
                        </div>
                        <div class="card-block">
                            <a href="${d.twitter}" class="card-link">${d.twitter}</a>
                        </div>
                    </div>
                </div>
                </div>

            `;
        }
        
    });


fetch(lanzamientosUrl)
    .then(res => res.json())
    .then(data => {
        const body = document.getElementById("lista");
        const date = new Date();
        var succes = "";
        
        for(var l of data){
            
            let t = new Date(l.launch_date_local);
            var diff = date.getTime() - t.getTime();
            var fechaD = Math.round(diff / (1000 * 60 * 60 * 24));

            if(l.launch_success == true){
                succes = "exito!";

            }else{
                succes = "fracaso!";
            }

            body.innerHTML = `
            ${body.innerHTML}
            <tr>
                <td>${l.flight_number}</td>
                <td>${l.mission_name}</td>
                <td>${l.launch_year}</td>
                <td>${fechaD}</td>
                <td id="estatus">${succes}</td>
                <td>
                    <a href="#" class="btn btn-info" role="button" onClick="detalleL(${l.flight_number});">Detalle</a>
                </td>
            </tr>
            `;
        }
    });


function detalleL(number){
    var urldetalle = `https://api.spacexdata.com/v3/launches?flight_number=${number}`
    
    fetch(urldetalle)
    .then(res => res.json())
    .then(data => {
        for(var detalle of data){
            console.log(detalle);
        }
    });
}