console.log("✅ Checking if academicTable.js is loaded!");

document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ academicTable.js is running!");

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

    console.log("📊 Data array:", data);

    // Function to populate the table  potential issue in function to populate table. 
    function populateTable() {
        const tableBody = document.querySelector("#academicTable tbody");
        if (!tableBody) {
            console.error("❌ Table body not found! JavaScript is running too early or the HTML is incorrect.");
            return;
        }
    
        console.log("📌 Populating table with data...");
    
        data.forEach((row, index) => {
            console.log(`🔍 Adding row ${index + 1}:`, row["Program"]);
    
            let mainRow = document.createElement("tr");
            mainRow.innerHTML = `
                <td>${row["Program"]}</td>
                <td>${row["Institution"]}</td>
                <td>${row["Department"]}</td>
                <td>${row["Faculty"]}</td>
                <td>${row["Courses"]}</td>
                <td><a href="${row["Link"]}" target="_blank">View Program</a></td>
                <td><a href="${row["Exhibition"]}" target="_blank">View Exhibition</a></td>
                <td>${row["Details"]}</td>  <!-- ✅ Now always visible -->
            `;
    
            tableBody.appendChild(mainRow);
        });
    
        console.log("✅ Table populated successfully!");
    }
    
    // Call the function to populate the table
    populateTable();

    console.log("✅ Table populated successfully!");
});
