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
            <th class="hidden">Institution / Location</th>
            <th class="hidden">Department</th>
            <th class="hidden">Faculty</th>
            <th class="hidden">Courses</th>
            <th class="hidden">Link</th>
            <th class="hidden">Exhibitions</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        // Manually enter data here instead of fetching from JSON
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

        const tableBody = document.querySelector("#academicTable tbody");

        data.forEach(row => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="main">${row["Program"]}</td>
                <td class="hidden">${row["Institution"]}</td>
                <td class="hidden">${row["Department"]}</td>
                <td class="hidden">${row["Faculty"]}</td>
                <td class="hidden">${row["Courses"]}</td>
                <td class="hidden"><a href="${row["Link"]}" target="_blank">Link</a></td>
                <td class="hidden"><a href="${row["Exhibition"]}" target="_blank">Exhibition</a></td>
            `;
            tr.addEventListener("click", function() {
                this.querySelectorAll("td.hidden").forEach(td => td.classList.toggle("show"));
            });
            tableBody.appendChild(tr);
        });
    });
</script>

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
        display: none;
    }
    .show {
        display: table-cell;
    }
    tr:hover {
        background-color: #f1f1f1;
        cursor: pointer;
    }
</style>
