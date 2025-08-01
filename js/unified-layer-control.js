// Unified Layer Control - Accordion Implementation
// This script creates a single, clean accordion interface that combines
// both the category layers (Student Projects) and GeoJSON layers (Municipal Governance)

class UnifiedLayerControl {
    constructor() {
        this.accordionContainer = null;
        this.sections = {};
        this.isInitialized = false;
        this.config = {
            sections: [
                {
                    id: 'municipal-governance',
                    title: 'Municipal Governance',
                    description: 'Official preservation data layers',
                    defaultExpanded: true
                },
                {
                    id: 'student-projects', 
                    title: 'Student Projects',
                    description: 'Academic research and projects',
                    defaultExpanded: false
                }
                // Add more sections here as needed
            ]
        };
    }

    // Step 1: Create the accordion structure
    createAccordionStructure() {
        // Create main container
        this.accordionContainer = document.createElement('div');
        this.accordionContainer.className = 'unified-layer-accordion';
        this.accordionContainer.id = 'unified-layer-accordion';

        // Create sections based on config
        this.config.sections.forEach(sectionConfig => {
            const section = this.createSection(sectionConfig);
            this.accordionContainer.appendChild(section);
            this.sections[sectionConfig.id] = section;
        });

        // Add to map
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.appendChild(this.accordionContainer);
        }
    }

    // Create individual section
    createSection(config) {
        const section = document.createElement('div');
        section.className = 'accordion-section';
        section.id = `section-${config.id}`;
        
        const header = document.createElement('button');
        header.className = `accordion-header ${config.id}-header`;
        header.innerHTML = `
            <span class="header-text">${config.title}</span>
            <span class="expand-icon">⌄</span>
        `;
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('data-section', config.id);
        
        const content = document.createElement('div');
        content.className = `accordion-content ${config.id}-content`;
        content.style.display = 'none';
        content.id = `content-${config.id}`;
        
        // Add description if provided
        if (config.description) {
            const description = document.createElement('div');
            description.className = 'section-description';
            description.textContent = config.description;
            content.appendChild(description);
        }
        
        section.appendChild(header);
        section.appendChild(content);

        // Add click handler
        header.addEventListener('click', () => this.toggleSection(config.id));
        
        return section;
    }

    // Step 2: Move existing layer controls into accordion
    moveExistingControls() {
        console.log('🔍 Looking for existing layer controls...');

        // Find and organize all layer controls
        const allControls = document.querySelectorAll('.leaflet-control-layers');
        console.log('📊 Found', allControls.length, 'total controls');

        // Municipal Governance controls (GeoJSON layers)
        const municipalControls = [];
        const studentControls = [];

        allControls.forEach((control, index) => {
            // More robust detection of municipal governance controls
            const isMunicipalControl = 
                control.classList.contains('municipal-governance-control') ||
                control.querySelector('a[href*="chicago.gov"]') ||
                control.querySelector('a[href*="nps.gov"]') ||
                control.querySelector('a[href*="preservationchicago.org"]') ||
                control.querySelector('label:contains("Chicago Landmarks")') ||
                control.querySelector('label:contains("National Register")') ||
                control.querySelector('label:contains("Mural Registry")') ||
                control.querySelector('label:contains("Historic Resources")') ||
                control.querySelector('label:contains("Community Areas")') ||
                // Check if control contains municipal governance specific text
                control.textContent.includes('Chicago Landmarks') ||
                control.textContent.includes('National Register') ||
                control.textContent.includes('Mural Registry') ||
                control.textContent.includes('Historic Resources') ||
                control.textContent.includes('Community Areas');

            if (isMunicipalControl) {
                municipalControls.push(control);
                console.log('🏛️ Identified municipal control:', control.textContent.substring(0, 50) + '...');
            } else {
                // Assume it's a student project control
                studentControls.push(control);
                console.log('🎓 Identified student control:', control.textContent.substring(0, 50) + '...');
            }
        });

        // Move municipal controls - only use the first one to avoid duplicates
        if (municipalControls.length > 0) {
            console.log('🏛️ Moving', municipalControls.length, 'municipal governance controls');
            const municipalContent = this.sections['municipal-governance'].querySelector('.accordion-content');
            
            // Only use the first municipal control to avoid duplicates
            const primaryMunicipalControl = municipalControls[0];
            const clonedControl = primaryMunicipalControl.cloneNode(true);
            
            // Ensure the cloned control maintains functionality
            this.setupClonedControl(clonedControl, primaryMunicipalControl);
            
            municipalContent.appendChild(clonedControl);
            
            // Hide all original municipal controls
            municipalControls.forEach(control => {
                control.style.display = 'none';
            });
        }

        // Move student controls
        if (studentControls.length > 0) {
            console.log('🎓 Moving', studentControls.length, 'student project controls');
            const studentContent = this.sections['student-projects'].querySelector('.accordion-content');
            
            // Only use the first student control to avoid duplicates
            const primaryStudentControl = studentControls[0];
            const clonedControl = primaryStudentControl.cloneNode(true);
            
            // Ensure the cloned control maintains functionality
            this.setupClonedControl(clonedControl, primaryStudentControl);
            
            studentContent.appendChild(clonedControl);
            
            // Hide all original student controls
            studentControls.forEach(control => {
                control.style.display = 'none';
            });
        }

        // If no controls found, hide the entire accordion
        if (municipalControls.length === 0 && studentControls.length === 0) {
            console.log('⚠️ No controls found, hiding accordion');
            this.accordionContainer.style.display = 'none';
        } else {
            console.log('✅ Controls moved successfully');
        }
    }

    // Setup cloned control to maintain functionality
    setupClonedControl(clonedControl, originalControl) {
        // Copy event listeners and functionality
        const checkboxes = clonedControl.querySelectorAll('input[type="checkbox"]');
        const originalCheckboxes = originalControl.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach((checkbox, index) => {
            const originalCheckbox = originalCheckboxes[index];
            if (originalCheckbox) {
                // Copy the checked state
                checkbox.checked = originalCheckbox.checked;
                
                // Add event listener that triggers the original checkbox
                checkbox.addEventListener('change', (e) => {
                    // Trigger the original checkbox
                    originalCheckbox.checked = checkbox.checked;
                    
                    // Dispatch change event on original checkbox to trigger Leaflet's layer toggle
                    const changeEvent = new Event('change', { bubbles: true });
                    originalCheckbox.dispatchEvent(changeEvent);
                    
                    // Also trigger click event for better compatibility
                    const clickEvent = new Event('click', { bubbles: true });
                    originalCheckbox.dispatchEvent(clickEvent);
                    
                    console.log('🔄 Layer toggled:', checkbox.checked ? 'on' : 'off');
                });
            }
        });

        // Copy radio button functionality if present
        const radios = clonedControl.querySelectorAll('input[type="radio"]');
        const originalRadios = originalControl.querySelectorAll('input[type="radio"]');
        
        radios.forEach((radio, index) => {
            const originalRadio = originalRadios[index];
            if (originalRadio) {
                radio.checked = originalRadio.checked;
                
                radio.addEventListener('change', (e) => {
                    originalRadio.checked = radio.checked;
                    const changeEvent = new Event('change', { bubbles: true });
                    originalRadio.dispatchEvent(changeEvent);
                });
            }
        });
    }

    // Step 3: Add accordion functionality
    toggleSection(sectionId) {
        const section = this.sections[sectionId];
        if (!section) return;

        const header = section.querySelector('.accordion-header');
        const content = section.querySelector('.accordion-content');
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

    // Add new section dynamically
    addSection(config) {
        const section = this.createSection(config);
        this.accordionContainer.appendChild(section);
        this.sections[config.id] = section;
        
        // Re-initialize if already initialized
        if (this.isInitialized) {
            this.moveExistingControls();
        }
    }

    // Hide original Leaflet controls properly
    hideOriginalControls() {
        // Find all original Leaflet layer controls
        const originalControls = document.querySelectorAll('.leaflet-control-layers');
        
        originalControls.forEach(control => {
            // Hide the control but keep it functional
            control.style.display = 'none';
            control.style.visibility = 'hidden';
            control.style.opacity = '0';
            control.style.pointerEvents = 'none';
            
            // Move it off-screen to prevent any interference
            control.style.position = 'absolute';
            control.style.left = '-9999px';
            control.style.top = '-9999px';
        });
        
        console.log('👻 Hidden', originalControls.length, 'original Leaflet controls');
    }

    // Debug function to check layer control functionality
    debugLayerControls() {
        console.log('🔍 Debugging layer controls...');
        
        // Check if original controls are hidden
        const originalControls = document.querySelectorAll('.leaflet-control-layers');
        console.log('📊 Original controls found:', originalControls.length);
        
        originalControls.forEach((control, index) => {
            console.log(`Control ${index}:`, {
                display: control.style.display,
                visibility: control.style.visibility,
                opacity: control.style.opacity,
                position: control.style.position
            });
        });
        
        // Check cloned controls in accordion
        const accordionControls = document.querySelectorAll('#unified-layer-accordion .leaflet-control-layers');
        console.log('📊 Accordion controls found:', accordionControls.length);
        
        accordionControls.forEach((control, index) => {
            const checkboxes = control.querySelectorAll('input[type="checkbox"]');
            console.log(`Accordion control ${index}:`, {
                checkboxes: checkboxes.length,
                visible: control.style.display !== 'none'
            });
            
            checkboxes.forEach((checkbox, cbIndex) => {
                console.log(`  Checkbox ${cbIndex}:`, {
                    checked: checkbox.checked,
                    disabled: checkbox.disabled,
                    hasEventListener: checkbox.onchange !== null
                });
            });
        });
        
        // Check if map layers are accessible
        if (typeof map !== 'undefined') {
            console.log('🗺️ Map layers:', map._layers);
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
                this.hideOriginalControls(); // Hide original controls
                this.isInitialized = true;
                
                // Expand default sections
                this.config.sections.forEach(section => {
                    if (section.defaultExpanded) {
                        this.toggleSection(section.id);
                    }
                });
                
                // Debug layer controls after initialization
                setTimeout(() => {
                    this.debugLayerControls();
                }, 1000);
                
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

// Global debug function for troubleshooting
window.debugUnifiedControl = function() {
    if (window.unifiedLayerControl) {
        console.log('🔍 Debugging Unified Layer Control...');
        window.unifiedLayerControl.debugLayerControls();
        
        // Test layer toggling
        const checkboxes = document.querySelectorAll('#unified-layer-accordion input[type="checkbox"]');
        console.log('📋 Found', checkboxes.length, 'checkboxes in accordion');
        
        checkboxes.forEach((checkbox, index) => {
            console.log(`Checkbox ${index}:`, {
                checked: checkbox.checked,
                disabled: checkbox.disabled,
                label: checkbox.nextElementSibling?.textContent || 'No label'
            });
        });
    } else {
        console.log('❌ Unified Layer Control not available');
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.unifiedLayerControl = new UnifiedLayerControl();
    window.unifiedLayerControl.init();
});

// Also initialize when map is ready (fallback)
if (typeof map !== 'undefined') {
    window.unifiedLayerControl = new UnifiedLayerControl();
    window.unifiedLayerControl.init();
}

// Additional fallback for when the map loads after DOM
window.addEventListener('load', function() {
    // Check if we already have a unified control
    if (!document.getElementById('unified-layer-accordion')) {
        window.unifiedLayerControl = new UnifiedLayerControl();
        window.unifiedLayerControl.init();
    }
});

// Listen for map initialization events
document.addEventListener('mapReady', function() {
    window.unifiedLayerControl = new UnifiedLayerControl();
    window.unifiedLayerControl.init();
}); 