// Unified Layer Control - Accordion Implementation
// This script creates a single, clean accordion interface that combines
// both the category layers (Student Projects) and GeoJSON layers (Municipal Governance)

class UnifiedLayerControl {
    constructor() {
        this.accordionContainer = null;
        this.municipalPanel = null;
        this.studentPanel = null;
        this.municipalContent = null;
        this.studentContent = null;
        this.isInitialized = false;
    }

    // Step 1: Create the accordion structure
    createAccordionStructure() {
        // Create main container
        this.accordionContainer = document.createElement('div');
        this.accordionContainer.className = 'unified-layer-accordion';
        this.accordionContainer.id = 'unified-layer-accordion';

        // Create Municipal Governance section
        const municipalSection = document.createElement('div');
        municipalSection.className = 'accordion-section';
        
        const municipalHeader = document.createElement('button');
        municipalHeader.className = 'accordion-header municipal-header';
        municipalHeader.innerHTML = '<span class="header-text">Municipal Governance</span><span class="expand-icon">⌄</span>';
        municipalHeader.setAttribute('aria-expanded', 'false');
        
        this.municipalContent = document.createElement('div');
        this.municipalContent.className = 'accordion-content municipal-content';
        this.municipalContent.style.display = 'none';
        
        municipalSection.appendChild(municipalHeader);
        municipalSection.appendChild(this.municipalContent);

        // Create Student Projects section
        const studentSection = document.createElement('div');
        studentSection.className = 'accordion-section';
        
        const studentHeader = document.createElement('button');
        studentHeader.className = 'accordion-header student-header';
        studentHeader.innerHTML = '<span class="header-text">Student Projects</span><span class="expand-icon">⌄</span>';
        studentHeader.setAttribute('aria-expanded', 'false');
        
        this.studentContent = document.createElement('div');
        this.studentContent.className = 'accordion-content student-content';
        this.studentContent.style.display = 'none';
        
        studentSection.appendChild(studentHeader);
        studentSection.appendChild(this.studentContent);

        // Assemble the accordion
        this.accordionContainer.appendChild(municipalSection);
        this.accordionContainer.appendChild(studentSection);

        // Add to map
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.appendChild(this.accordionContainer);
        }

        // Add click handlers
        municipalHeader.addEventListener('click', () => this.toggleSection('municipal'));
        studentHeader.addEventListener('click', () => this.toggleSection('student'));
    }

    // Step 2: Move existing layer controls into accordion
    moveExistingControls() {
        let municipalFound = false;
        let studentFound = false;

        console.log('🔍 Looking for existing layer controls...');

        // Find the existing GeoJSON layer control (Municipal Governance)
        const municipalControl = document.querySelector('.municipal-governance-control');
        if (municipalControl) {
            console.log('🏛️ Found municipal governance control');
            // Clone the content and move it to municipal panel
            const municipalContent = municipalControl.cloneNode(true);
            this.municipalContent.appendChild(municipalContent);
            
            // Hide the original control
            municipalControl.style.display = 'none';
            municipalFound = true;
        } else {
            console.log('❌ Municipal governance control not found');
        }

        // Find the existing category control (Student Projects)
        const studentControl = document.querySelector('.student-projects-control');
        if (studentControl) {
            console.log('🎓 Found student projects control');
            // Clone the content and move it to student panel
            const studentContent = studentControl.cloneNode(true);
            this.studentContent.appendChild(studentContent);
            
            // Hide the original control
            studentControl.style.display = 'none';
            studentFound = true;
        } else {
            console.log('❌ Student projects control not found');
        }

        // Fallback: if we can't find the specific controls, try the general approach
        if (!municipalFound || !studentFound) {
            console.log('🔄 Using fallback approach...');
            const allControls = document.querySelectorAll('.leaflet-control-layers');
            console.log('📊 Found', allControls.length, 'total controls');
            
            if (allControls.length >= 2) {
                // First control is usually the municipal one
                if (!municipalFound) {
                    console.log('🏛️ Using first control as municipal governance');
                    const municipalContent = allControls[0].cloneNode(true);
                    this.municipalContent.appendChild(municipalContent);
                    allControls[0].style.display = 'none';
                    municipalFound = true;
                }
                
                // Second control is usually the student projects
                if (!studentFound) {
                    console.log('🎓 Using second control as student projects');
                    const studentContent = allControls[1].cloneNode(true);
                    this.studentContent.appendChild(studentContent);
                    allControls[1].style.display = 'none';
                    studentFound = true;
                }
            } else if (allControls.length === 1) {
                console.log('📋 Using single control as municipal governance');
                // If there's only one control, put it in municipal governance
                const content = allControls[0].cloneNode(true);
                this.municipalContent.appendChild(content);
                allControls[0].style.display = 'none';
                municipalFound = true;
                
                // Hide the student projects section if no content
                const studentHeader = this.accordionContainer.querySelector('.student-header');
                const studentSection = studentHeader.parentElement;
                studentSection.style.display = 'none';
            }
        }

        // If no controls found at all, hide the entire accordion
        if (!municipalFound && !studentFound) {
            console.log('⚠️ No controls found, hiding accordion');
            this.accordionContainer.style.display = 'none';
        } else {
            console.log('✅ Controls moved successfully:', { municipalFound, studentFound });
        }
    }

    // Step 3: Add accordion functionality
    toggleSection(sectionType) {
        const header = sectionType === 'municipal' 
            ? this.accordionContainer.querySelector('.municipal-header')
            : this.accordionContainer.querySelector('.student-header');
        
        const content = sectionType === 'municipal' 
            ? this.municipalContent 
            : this.studentContent;
        
        const expandIcon = header.querySelector('.expand-icon');
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            // Collapse
            content.style.display = 'none';
            header.setAttribute('aria-expanded', 'false');
            expandIcon.textContent = '⌄';
            header.classList.remove('expanded');
        } else {
            // Expand
            content.style.display = 'block';
            header.setAttribute('aria-expanded', 'true');
            expandIcon.textContent = '⌃';
            header.classList.add('expanded');
        }
    }

    // Initialize the unified control
    init() {
        if (this.isInitialized) return;
        
        console.log('🔄 Initializing Unified Layer Control...');
        
        // Wait for the map and existing controls to be ready
        const initUnifiedControl = () => {
            // Check if the map and controls are ready
            const mapContainer = document.getElementById('map');
            const existingControls = document.querySelectorAll('.leaflet-control-layers');
            
            console.log('📍 Map container:', mapContainer ? 'Found' : 'Not found');
            console.log('🎛️ Existing controls:', existingControls.length);
            
            if (mapContainer && existingControls.length > 0) {
                console.log('✅ Creating unified accordion structure...');
                this.createAccordionStructure();
                this.moveExistingControls();
                this.isInitialized = true;
                
                // Expand Municipal Governance by default
                this.toggleSection('municipal');
                console.log('✅ Unified Layer Control initialized successfully!');
            } else {
                console.log('⏳ Waiting for map and controls to be ready...');
                // Try again in 500ms
                setTimeout(initUnifiedControl, 500);
            }
        };
        
        // Start the initialization process
        setTimeout(initUnifiedControl, 1000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const unifiedControl = new UnifiedLayerControl();
    unifiedControl.init();
});

// Also initialize when map is ready (fallback)
if (typeof map !== 'undefined') {
    const unifiedControl = new UnifiedLayerControl();
    unifiedControl.init();
}

// Additional fallback for when the map loads after DOM
window.addEventListener('load', function() {
    // Check if we already have a unified control
    if (!document.getElementById('unified-layer-accordion')) {
        const unifiedControl = new UnifiedLayerControl();
        unifiedControl.init();
    }
});

// Listen for map initialization events
document.addEventListener('mapReady', function() {
    const unifiedControl = new UnifiedLayerControl();
    unifiedControl.init();
}); 