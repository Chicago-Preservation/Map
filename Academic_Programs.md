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
            <th class="toggle-header">Institution / Location</th>
            <th class="toggle-header">Department</th>
            <th class="toggle-header">Faculty</th>
            <th class="toggle-header">Courses</th>
            <th class="toggle-header">Link</th>
            <th class="toggle-header">Exhibitions</th>
        </tr>
    </thead>
    <tbody></tbody>
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
            "Exhibition": "https://www.saic.edu/historic-preservation/people/projects"
        },
        {
            "Program": "Master of Historic Preservation",
            "Institution": "University of Florida",
            "Department": "College of Design, Construction and Planning",
            "Faculty": "Cleary Larkin; Linda Stevenson",
            "Courses": "DCP 6710 History and Theory of Historic Preservation",
            "Link": "https://dcp.ufl.edu/historic-preservation/",
            "Exhibition": "https://dcp.ufl.edu/historic-preservation/projects"
        },
        {
            "Program": "Master of Science in Historic Preservation",
            "Institution": "University of Texas",
            "Department": "School of Architecture",
            "Faculty": "Tara Dudley; Juliana Felkner",
            "Courses": "American Architecture; National Register Documentation",
            "Link": "https://soa.utexas.edu/historic-preservation/certificates",
            "Exhibition": "https://soa.utexas.edu/historic-preservation/research"
        }
    ];

    data.forEach(row => {
        let tr = document.createElement("tr");

        // First column (Program) is always visible
        tr.innerHTML = `<td class="main">${row["Program"]}</td>`;

        // Create another row for hidden details (initially hidden)
        let detailsRow = document.createElement("tr");
        detailsRow.classList.add("details-row", "hidden");

        let detailsTd = document.createElement("td");
        detailsTd.setAttribute("colspan", "7"); // Spans all columns

        // Add content for hidden row
        detailsTd.innerHTML = `
            <strong>Institution:</strong> ${row["Institution"]} <br>
            <strong>Department:</strong> ${row["Department"]} <br>
            <strong>Faculty:</strong> ${row["Faculty"]} <br>
            <strong>Courses:</strong> ${row["Courses"]} <br>
            <strong>Link:</strong> <a href="${row["Link"]}" target="_blank">View Program</a> <br>
            <strong>Exhibition:</strong> <a href="${row["Exhibition"]}" target="_blank">View Exhibition</a>
        `;
        detailsRow.appendChild(detailsTd);

        // Click event to show/hide details
        tr.addEventListener("click", function() {
            detailsRow.classList.toggle("hidden");
        });

        tableBody.appendChild(tr);
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
        display: none;  /* Hides the details row initially */
    }
    .details-row td {
        background-color: #f9f9f9; /* Light background for details */
    }
    tr:hover {
        background-color: #f1f1f1;
        cursor: pointer;
    }
</style>
