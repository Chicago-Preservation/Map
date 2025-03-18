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
        fetch('https://raw.githubusercontent.com/Chicago-Preservation/Map/master/Resources/academic_programs.json')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector("#academicTable tbody");

                data.forEach(row => {
                    let tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td class="main">${row["Program/certification/concentration"]}</td>
                        <td class="hidden">${row["institution / location"]}</td>
                        <td class="hidden">${row["department housed in"]}</td>
                        <td class="hidden">${row["faculty who teach"]}</td>
                        <td class="hidden">${row["what courses are (skill/social concerns)"]}</td>
                        <td class="hidden"><a href="${row["Link"]}" target="_blank">Link</a></td>
                        <td class="hidden"><a href="${row["public facing - digital exhibition (link) to projects, + description of projects"]}" target="_blank">Exhibition</a></td>
                    `;
                    tr.addEventListener("click", function() {
                        this.querySelectorAll("td.hidden").forEach(td => td.classList.toggle("show"));
                    });
                    tableBody.appendChild(tr);
                });
            })
            .catch(error => console.error("Error loading data:", error));
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
