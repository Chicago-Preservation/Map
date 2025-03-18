document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ Script loaded successfully");

    const tableBody = document.querySelector("#academicTable tbody");
    if (!tableBody) {
        console.error("❌ Table body not found! JavaScript is running too early.");
        return;
    }

    const data = [
        {
            "Program": "Masters in Historic Preservation",
            "Institution": "SAIC",
            "Department": "Department of Historic Preservation",
            "Faculty": "Richard Friedman; Nicholas Lowe",
            "Courses": "Preservation Law; Physical Documentation; Restoration Design Studio",
            "Link": "https://www.saic.edu/historic-preservation",
            "Exhibition": "https://www.saic.edu/historic-preservation/people/projects",
            "Details": "SAIC offers a comprehensive preservation program that covers legal, documentation, and restoration techniques."
        },
        {
            "Program": "Master of Historic Preservation",
            "Institution": "University of Florida",
            "Department": "College of Design, Construction and Planning",
            "Faculty": "Cleary Larkin; Linda Stevenson",
            "Courses": "DCP 6710 History and Theory of Historic Preservation",
            "Link": "https://dcp.ufl.edu/historic-preservation/",
            "Exhibition": "https://dcp.ufl.edu/historic-preservation/projects",
            "Details": "University of Florida provides interdisciplinary training in historic preservation with hands-on fieldwork."
        }
    ];

    data.forEach(row => {
        let mainRow = document.createElement("tr");
        mainRow.innerHTML = `
            <td>${row["Program"]}</td>
            <td>${row["Institution"]}</td>
            <td>${row["Department"]}</td>
            <td>${row["Faculty"]}</td>
            <td>${row["Courses"]}</td>
            <td><a href="${row["Link"]}" target="_blank">View Program</a></td>
            <td><a href="${row["Exhibition"]}" target="_blank">View Exhibition</a></td>
            <td><button class="show-more-btn">Show More</button></td>
        `;

        let detailsRow = document.createElement("tr");
        detailsRow.classList.add("details-row", "hidden");

        let detailsTd = document.createElement("td");
        detailsTd.setAttribute("colspan", "8"); // Adjusted colspan to fit the new button column
        detailsTd.innerHTML = `<strong>More Info:</strong> ${row["Details"]}`;
        detailsRow.appendChild(detailsTd);

        const showMoreBtn = mainRow.querySelector(".show-more-btn");
        showMoreBtn.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent row click interference
            detailsRow.classList.toggle("hidden");
            showMoreBtn.textContent = detailsRow.classList.contains("hidden") ? "Show More" : "Show Less";
        });

        tableBody.appendChild(mainRow);
        tableBody.appendChild(detailsRow);
    });
});
