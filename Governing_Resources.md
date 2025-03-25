---
layout: page
title: Governing Resources
status: category
---

<style>
    .accordion {
        background-color: #b61212;
        color: white;
        cursor: pointer;
        padding: 12px 20px;
        width: 100%;
        border: none;
        text-align: left;
        outline: none;
        font-size: 18px;
        transition: background-color 0.2s ease;
        margin-top: 10px;
        border-radius: 5px;
    }

    .accordion:hover {
        background-color: #991010;
    }

    .panel {
        padding: 0 20px;
        display: none;
        background-color: #f9f9f9;
        overflow: hidden;
        border-left: 3px solid #b61212;
        margin-bottom: 10px;
    }

    .panel p {
        margin: 12px 0;
    }

    .panel a {
        color: #b61212;
        text-decoration: underline;
    }

    .accordion:after {
        content: '▼';
        float: right;
    }

    .active:after {
        content: "▲";
    }
</style>

<h2>Governing Resources</h2>
<p>Preservation efforts rely on a network of governing bodies, regulatory frameworks, and evaluation criteria that determine how historic sites are designated, documented, and maintained. This guide provides an overview of organizations responsible for historic preservation, providing insight into what each entity does, what it does and does not regulate, financial assistance programs, and step-by-step application processes.</p>

<!-- Accordions Start -->
<button class="accordion">National Register of Historic Places</button>
<div class="panel">
  <p><strong>Managed By:</strong> National Park Service</p>
  <p><strong>What it Covers:</strong> (1) Federal recognition... (3) Section 106 Review...</p>
  <p><strong>What it Doesn’t Cover:</strong> (1) No direct control... (2) Listing does not prevent...</p>
  <p><strong>Financial Assistance:</strong> Federal Historic Preservation Tax Credit: 20% credit...</p>
  <p><strong>How to Apply:</strong> <a href="https://www.nps.gov/...">NPS Form 10-900</a>, <a href="https://www.nps.gov/...">Guide to Completing the Form</a></p>
  <p><strong>Evaluation Criteria:</strong> (1) Significance... (2) Integrity...</p>
</div>

<button class="accordion">Chicago Landmark Designation</button>
<div class="panel">
  <p><strong>Managed By:</strong> Commission on Chicago Landmarks</p>
  <p><strong>What it Covers:</strong> (1) Local designation... (2) Permit review process...</p>
  <p><strong>What it Doesn’t Cover:</strong> Owner consent is required...</p>
  <p><strong>Financial Assistance:</strong> Property Tax Assessment Freeze... Class L Property Tax Incentive...</p>
  <p><strong>How to Apply:</strong> <a href="https://www.chicago.gov/...">Landmark Proposal Form</a>, <a href="https://www.chicago.gov/...">Additional Information</a></p>
  <p><strong>Evaluation Criteria:</strong> (1) Architectural Significance... (2) Historical Significance... (3) Integrity...</p>
</div>

<button class="accordion">Illinois State Historic Preservation Office (SHPO)</button>
<div class="panel">
  <p><strong>Managed By:</strong> Illinois Department of Natural Resources</p>
  <p><strong>What it Covers:</strong> (1) State-level recognition... (2) Administration of state tax incentives...</p>
  <p><strong>What it Doesn’t Cover:</strong> No regulatory authority over privately owned properties unless...</p>
  <p><strong>Financial Assistance:</strong> 25% Illinois Historic Preservation Tax Credit... Property Tax Assessment Freeze...</p>
  <p><strong>How to Apply:</strong> <a href="https://dnrhistoric.illinois.gov/...">Preliminary Application</a>, <a href="https://dnrhistoric.illinois.gov/...">Application Guide</a>, <a href="https://dnrhistoric.illinois.gov/...">GIS Support</a></p>
  <p><strong>Evaluation Criteria:</strong> (1) Historical and Cultural Significance... (2) Integrity...</p>
</div>

<button class="accordion">Chicago Historic Resources Survey (CHRS)</button>
<div class="panel">
  <p><strong>Managed By:</strong> City of Chicago</p>
  <p><strong>What it Covers:</strong> (1) Comprehensive survey... (2) Basis for preservation planning... (3) Demolition-Delay Ordinance...</p>
  <p><strong>What it Doesn’t Cover:</strong> Properties newer than 40 years... "green" and "blue" properties...</p>
  <p><strong>Financial Assistance:</strong> -</p>
  <p><strong>How to Apply:</strong> <a href="https://webapps1.chicago.gov/...">Searchable Online Database</a></p>
  <p><strong>Evaluation Criteria:</strong> Significance Ratings...</p>
</div>

<button class="accordion">Mural Registry</button>
<div class="panel">
  <p><strong>Managed By:</strong> Department of Cultural Affairs & Special Events (DCASE)</p>
  <p><strong>What it Covers:</strong> (1) Official recognition and documentation of murals... (2) Mural ID and emblem...</p>
  <p><strong>What it Doesn’t Cover:</strong> No financial assistance... No protection from alteration...</p>
  <p><strong>Financial Assistance:</strong> -</p>
  <p><strong>How to Apply:</strong> <a href="https://www.surveymonkey.com/r/95FYR9C">Online Application</a></p>
  <p><strong>Evaluation Criteria:</strong> (1) Artistic Quality... (2) Community Engagement...</p>
</div>

<button class="accordion">Landmarks Illinois</button>
<div class="panel">
  <p><strong>Managed By:</strong> Nonprofit Organization</p>
  <p><strong>What it Covers:</strong> (1) Advocacy and financial assistance... (2) Educational programs and technical assistance...</p>
  <p><strong>What it Doesn’t Cover:</strong> -</p>
  <p><strong>Financial Assistance:</strong> Preservation Heritage Fund Grants...</p>
  <p><strong>How to Apply:</strong> <a href="https://landmarksillinois.submittable.com/...">Online Submission</a>, <a href="https://www.landmarks.org/...">Submission Criteria</a></p>
  <p><strong>Evaluation Criteria:</strong> (1) Significance... (2) Urgency... (3) Community Impact...</p>
</div>

<script>
    const acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
</script>

