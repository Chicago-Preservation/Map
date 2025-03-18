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
            <th >Institution / Location</th>
            <th >Department</th>
            <th >Faculty</th>
            <th >Courses</th>
            <th >Link</th>
            <th >Exhibitions</th>
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

        // The first row, always visible
        tr.innerHTML = `<td class="main">${row["Program"]}</td>`;

        // Hidden rows, initially hidden
        Object.keys(row).forEach((key, index) => {
            if (index > 0) { // Skip the first column (Program)
                let td = document.createElement("td");
                td.classList.add("hidden");
                if (row[key].startsWith("http")) {
                    td.innerHTML = `<a href="${row[key]}" target="_blank">Link</a>`;
                } else {
                    td.innerText = row[key];
                }
                tr.appendChild(td);
            }
        });

        tr.addEventListener("click", function() {
            let cells = this.querySelectorAll("td.hidden");
            cells.forEach(cell => {
                cell.classList.toggle("show");
            });
        });

        tableBody.appendChild(tr);
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
        display: none;  /* Initially hidden */
    }
    .show {
        display: table-cell !important; /* Ensures it overrides hidden */
    }
    tr:hover {
        background-color: #f1f1f1;
        cursor: pointer;
    }
</style>
