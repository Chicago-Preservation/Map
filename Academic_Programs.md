---
layout: page
title: Academic Programs
status: category
---

## Academic Programs

Click on a program to see more details.

<table id="academicTable">
    <thead>
        <tr>
            <th>Program</th>
            <th>Institution / Location</th>
            <th>Department</th>
            <th>Faculty</th>
            <th>Courses</th>
            <th>Link</th>
            <th>Exhibitions</th>
        </tr>
    </thead>
  <tbody>
    <tr>
        <td>Masters in Historic Preservation</td>
        <td>SAIC</td>
        <td>Department of Historic Preservation</td>
        <td>Richard Friedman; Nicholas Lowe</td>
        <td>Preservation Law; Physical Documentation</td>
        <td><a href="https://www.saic.edu/historic-preservation" target="_blank">View Program</a></td>
        <td><a href="https://www.saic.edu/historic-preservation/people/projects" target="_blank">View Exhibition</a></td>
    </tr>
</tbody>

</table>

{% raw %}
<script>
document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.querySelector("#academicTable tbody");

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
        // Create main row (always visible)
        let mainRow = document.createElement("tr");
        mainRow.innerHTML = `
            <td>${row["Program"]}</td>
            <td>${row["Institution"]}</td>
            <td>${row["Department"]}</td>
            <td>${row["Faculty"]}</td>
            <td>${row["Courses"]}</td>
            <td><a href="${row["Link"]}" target="_blank">View Program</a></td>
            <td><a href="${row["Exhibition"]}" target="_blank">View Exhibition</a></td>
        `;

        // Create hidden details row
        let detailsRow = document.createElement("tr");
        detailsRow.classList.add("details-row", "hidden");

        let detailsTd = document.createElement("td");
        detailsTd.setAttribute("colspan", "7"); // Expand across all columns
        detailsTd.innerHTML = `<strong>More Info:</strong> ${row["Details"]}`;
        detailsRow.appendChild(detailsTd);

        // Click event to toggle expansion
        mainRow.addEventListener("click", function() {
            detailsRow.classList.toggle("hidden");
        });

        tableBody.appendChild(mainRow);
        tableBody.appendChild(detailsRow);
    });
});
</script>
{% endraw %}

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: left;
    }
    .hidden {
        display: none;  /* Initially hide the details row */
    }
    .details-row td {
        background-color: #f9f9f9; /* Light background for expanded row */
    }
    tr:hover {
        background-color: #f1f1f1;
        cursor: pointer;
    }
</style>
