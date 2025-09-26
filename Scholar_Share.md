---
layout: page
title: Scholar Share
status: category
---
<div class="publication-entry">
  <h2>Chicago Consortium for Historic Preservation White Paper 2025</h2>
  
  <p><strong>Authors:</strong> Mel Rovner and Emily Talen, University of Chicago<br>
  <strong>Date:</strong> March 27, 2025</p>
  
  <p><a href="{{ site.baseurl }}/assets/Consortium%20for%20Chicago%20Preservation%20White%20Paper%202025.pdf" target="_blank">Download PDF</a></p>
  
  <div class="expandable-description">
    <div class="description-preview">
      <p><strong>Description:</strong> This white paper presents findings from interviews with 24 faculty across Chicagoland institutions and proposes the establishment of the Chicago Consortium for Historic Preservation (CCHP)...</p>
      <button class="expand-btn" onclick="toggleDescription(this)">
        <span class="arrow">▼</span> Read More
      </button>
    </div>
    
    <div class="description-full" style="display: none;">
      <p><strong>Description:</strong> This white paper presents findings from interviews with 24 faculty across Chicagoland institutions and proposes the establishment of the Chicago Consortium for Historic Preservation (CCHP). The research reveals significant challenges in preservation education and practice, including outdated digital infrastructure, limited access to archival materials, and representation gaps in historic designation. The authors propose two key initiatives: a digital repository for sharing preservation research and resources, and an annual forum for critical reflection on preservation work in Chicago. The paper addresses contemporary preservation issues including the relationship between preservation and affordable housing, gentrification pressures, and the need for more inclusive approaches that center historically underrepresented communities. Survey findings highlight the evolution of preservation practice beyond physical conservation to encompass storytelling, intangible heritage, and community advocacy.</p>
      
      <p><strong>Key Topics:</strong> Academic-community collaboration, digital preservation resources, preservation pedagogy, equity in historic designation, interdisciplinary approaches to heritage documentation</p>
      
      <button class="expand-btn" onclick="toggleDescription(this)">
        <span class="arrow">▲</span> Read Less
      </button>
    </div>
  </div>
</div>

<style>
.expandable-description {
  margin-top: 10px;
}

.expand-btn {
  background: none;
  border: none;
  color: #0066cc;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  padding: 0;
  margin-top: 5px;
}

.expand-btn:hover {
  color: #004499;
}

.arrow {
  font-size: 12px;
  margin-right: 5px;
}
</style>

<script>
function toggleDescription(button) {
  const container = button.closest('.expandable-description');
  const preview = container.querySelector('.description-preview');
  const full = container.querySelector('.description-full');
  
  if (full.style.display === 'none') {
    preview.style.display = 'none';
    full.style.display = 'block';
  } else {
    preview.style.display = 'block';
    full.style.display = 'none';
  }
}
</script>
