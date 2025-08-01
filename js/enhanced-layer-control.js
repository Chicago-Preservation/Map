// Enhanced Leaflet Layer Control
// This script enhances the original Leaflet layer control to have an accordion-style appearance
// instead of creating a separate unified control

class EnhancedLayerControl {
    constructor() {
        this.isInitialized = false;
        this.originalControl = null;
        this.enhancedControl = null;
    }

    // Find and enhance the original Leaflet layer control
    enhanceOriginalControl() {
        console.log('🔍 Looking for original Leaflet layer control...');
        
        // Find the original Leaflet layer control
        const originalControl = document.querySelector('.leaflet-control-layers');
        
        if (!originalControl) {
            console.log('❌ No original Leaflet layer control found');
            return;
        }

        this.originalControl = originalControl;
        console.log('✅ Found original Leaflet layer control');

        // Create enhanced control structure
        this.createEnhancedStructure();
        
        // Move existing content to enhanced structure
        this.moveContentToEnhanced();
        
        // Apply enhanced styling
        this.applyEnhancedStyling();
        
        console.log('✅ Enhanced layer control created successfully');
    }

    // Create enhanced accordion structure
    createEnhancedStructure() {
        // Create the enhanced container
        this.enhancedControl = document.createElement('div');
        this.enhancedControl.className = 'enhanced-layer-control';
        this.enhancedControl.id = 'enhanced-layer-control';

        // Create Municipal Governance section
        const municipalSection = this.createSection({
            id: 'municipal-governance',
            title: 'Municipal Governance',
            description: 'Official preservation data layers'
        });

        // Create Student Projects section
        const studentSection = this.createSection({
            id: 'student-projects',
            title: 'Student Projects',
            description: 'Academic research and projects'
        });

        // Assemble the enhanced control
        this.enhancedControl.appendChild(municipalSection);
        this.enhancedControl.appendChild(studentSection);

        // Replace the original control with enhanced one
        this.originalControl.parentNode.insertBefore(this.enhancedControl, this.originalControl);
        this.originalControl.style.display = 'none';
    }

    // Create individual section
    createSection(config) {
        const section = document.createElement('div');
        section.className = 'enhanced-section';
        section.id = `enhanced-section-${config.id}`;
        
        const header = document.createElement('button');
        header.className = `enhanced-header ${config.id}-header`;
        header.innerHTML = `
            <span class="header-text">${config.title}</span>
            <span class="expand-icon">⌄</span>
        `;
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('data-section', config.id);
        
        const content = document.createElement('div');
        content.className = `enhanced-content ${config.id}-content`;
        content.style.display = 'none';
        content.id = `enhanced-content-${config.id}`;
        
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

    // Move content from original control to enhanced structure
    moveContentToEnhanced() {
        const municipalContent = document.getElementById('enhanced-content-municipal-governance');
        const studentContent = document.getElementById('enhanced-content-student-projects');

        // Find all layer controls and organize them
        const allLayerControls = this.originalControl.querySelectorAll('.leaflet-control-layers-overlays');
        
        allLayerControls.forEach((layerControl, index) => {
            // Determine if this is municipal governance or student projects
            const isMunicipal = this.isMunicipalControl(layerControl);
            
            if (isMunicipal) {
                console.log('🏛️ Moving municipal governance content');
                municipalContent.appendChild(layerControl.cloneNode(true));
            } else {
                console.log('🎓 Moving student projects content');
                studentContent.appendChild(layerControl.cloneNode(true));
            }
        });

        // Expand Municipal Governance by default
        this.toggleSection('municipal-governance');
    }

    // Determine if a control is municipal governance
    isMunicipalControl(layerControl) {
        const text = layerControl.textContent || '';
        return text.includes('Chicago Landmarks') ||
               text.includes('National Register') ||
               text.includes('Mural Registry') ||
               text.includes('Historic Resources') ||
               text.includes('Community Areas');
    }

    // Toggle section visibility
    toggleSection(sectionId) {
        const section = document.getElementById(`enhanced-section-${sectionId}`);
        if (!section) return;

        const header = section.querySelector('.enhanced-header');
        const content = section.querySelector('.enhanced-content');
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

    // Apply enhanced styling
    applyEnhancedStyling() {
        // The styling is handled by CSS classes
        this.enhancedControl.classList.add('enhanced-layer-control-styled');
    }

    // Initialize the enhanced control
    init() {
        if (this.isInitialized) return;
        
        console.log('🔄 Initializing Enhanced Layer Control...');
        
        // Wait for the map and original control to be ready
        const initEnhancedControl = () => {
            const mapContainer = document.getElementById('map');
            const originalControl = document.querySelector('.leaflet-control-layers');
            
            console.log('📍 Map container:', mapContainer ? 'Found' : 'Not found');
            console.log('🎛️ Original control:', originalControl ? 'Found' : 'Not found');
            
            if (mapContainer && originalControl) {
                console.log('✅ Creating enhanced layer control...');
                this.enhanceOriginalControl();
                this.isInitialized = true;
                console.log('✅ Enhanced Layer Control initialized successfully!');
            } else {
                console.log('⏳ Waiting for map and original control to be ready...');
                setTimeout(initEnhancedControl, 500);
            }
        };
        
        // Start the initialization process
        setTimeout(initEnhancedControl, 1000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.enhancedLayerControl = new EnhancedLayerControl();
    window.enhancedLayerControl.init();
});

// Also initialize when map is ready (fallback)
if (typeof map !== 'undefined') {
    window.enhancedLayerControl = new EnhancedLayerControl();
    window.enhancedLayerControl.init();
}

// Additional fallback for when the map loads after DOM
window.addEventListener('load', function() {
    if (!document.getElementById('enhanced-layer-control')) {
        window.enhancedLayerControl = new EnhancedLayerControl();
        window.enhancedLayerControl.init();
    }
});

// Global debug function for troubleshooting
window.debugEnhancedControl = function() {
    if (window.enhancedLayerControl) {
        console.log('🔍 Debugging Enhanced Layer Control...');
        console.log('Enhanced control:', document.getElementById('enhanced-layer-control'));
        console.log('Original control:', document.querySelector('.leaflet-control-layers'));
    } else {
        console.log('❌ Enhanced Layer Control not available');
    }
}; 