// Enhanced Leaflet Layer Control
// This script enhances the original Leaflet layer control to have an accordion-style appearance
// instead of creating a separate unified control

class EnhancedLayerControl {
    constructor() {
        this.config = {
            sections: [
                {
                    id: 'municipal-governance',
                    title: 'Municipal Governance',
                    icon: 'fa fa-building'
                },
                {
                    id: 'student-projects', 
                    title: 'Student Projects',
                    icon: 'fa fa-graduation-cap'
                }
            ]
        };
        
        // Initialize immediately to prevent flickering
        this.init();
    }

    init() {
        console.log('🔧 Enhanced Layer Control: Initializing...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.enhanceOriginalControl();
            });
        } else {
            // DOM is already ready
            this.enhanceOriginalControl();
        }
    }

    enhanceOriginalControl() {
        console.log('🔧 Enhanced Layer Control: Enhancing original control...');
        
        // Find the original Leaflet layer control
        const originalControl = document.querySelector('.leaflet-control-layers');
        
        if (!originalControl) {
            console.log('❌ Enhanced Layer Control: Original control not found, retrying...');
            // Retry after a short delay
            setTimeout(() => this.enhanceOriginalControl(), 500);
            return;
        }
        
        console.log('✅ Enhanced Layer Control: Found original control');
        
        // Store original layer lists before modifying
        const originalLayerLists = originalControl.querySelectorAll('.leaflet-control-layers-overlays');
        console.log('📋 Found', originalLayerLists.length, 'original layer lists');
        
        // Hide the original control immediately to prevent flickering
        originalControl.style.display = 'none';
        originalControl.style.visibility = 'hidden';
        originalControl.style.opacity = '0';
        
        // Add enhanced styling class
        originalControl.classList.add('enhanced-layer-control');
        
        // Create accordion structure within the original control
        this.createAccordionStructure(originalControl);
        
        // Move existing layer lists into accordion sections
        this.moveLayerLists(originalControl, originalLayerLists);
        
        // Show the enhanced control
        originalControl.style.display = 'block';
        originalControl.style.visibility = 'visible';
        originalControl.style.opacity = '1';
        
        console.log('✅ Enhanced Layer Control: Enhancement complete');
    }

    createAccordionStructure(container) {
        console.log('🔧 Enhanced Layer Control: Creating accordion structure...');
        
        // Create accordion container
        const accordionContainer = document.createElement('div');
        accordionContainer.className = 'enhanced-accordion';
        
        // Create sections
        this.config.sections.forEach((section, index) => {
            const sectionElement = document.createElement('div');
            sectionElement.className = 'enhanced-section';
            sectionElement.id = section.id;
            
            const header = document.createElement('div');
            header.className = 'enhanced-header';
            header.innerHTML = `
                <i class="${section.icon}"></i>
                <span>${section.title}</span>
                <i class="fa fa-chevron-down enhanced-arrow"></i>
            `;
            
            const content = document.createElement('div');
            content.className = 'enhanced-content';
            
            // Add click handler for accordion functionality
            header.addEventListener('click', () => this.toggleSection(sectionElement));
            
            sectionElement.appendChild(header);
            sectionElement.appendChild(content);
            accordionContainer.appendChild(sectionElement);
        });
        
        // Clear container and add accordion
        container.innerHTML = '';
        container.appendChild(accordionContainer);
        
        console.log('✅ Enhanced Layer Control: Accordion structure created');
    }

    moveLayerLists(container, originalLayerLists) {
        console.log('🔧 Enhanced Layer Control: Moving layer lists...');
        
        if (!originalLayerLists || originalLayerLists.length === 0) {
            console.log('❌ Enhanced Layer Control: No layer lists found');
            return;
        }
        
        // Find accordion sections
        const municipalSection = container.querySelector('#municipal-governance .enhanced-content');
        const studentSection = container.querySelector('#student-projects .enhanced-content');
        
        if (!municipalSection || !studentSection) {
            console.log('❌ Enhanced Layer Control: Accordion sections not found');
            return;
        }
        
        // Move layer lists to appropriate sections
        originalLayerLists.forEach((layerList, index) => {
            console.log(`📋 Processing layer list ${index + 1}:`, layerList.textContent.substring(0, 50) + '...');
            
            // Clone the layer list to preserve functionality
            const clonedLayerList = layerList.cloneNode(true);
            
            // Preserve all event listeners and functionality
            this.preserveLayerFunctionality(clonedLayerList, layerList);
            
            if (index === 0 && municipalSection) {
                // First layer list goes to Municipal Governance
                municipalSection.appendChild(clonedLayerList);
                console.log('✅ Enhanced Layer Control: Moved municipal layers');
            } else if (index === 1 && studentSection) {
                // Second layer list goes to Student Projects
                studentSection.appendChild(clonedLayerList);
                console.log('✅ Enhanced Layer Control: Moved student layers');
            }
        });
        
        // Open Municipal Governance by default
        const municipalHeader = container.querySelector('#municipal-governance .enhanced-header');
        if (municipalHeader) {
            municipalHeader.click();
        }
        
        console.log('✅ Enhanced Layer Control: Layer lists moved successfully');
    }

    preserveLayerFunctionality(clonedList, originalList) {
        // Find all checkboxes in both lists
        const clonedCheckboxes = clonedList.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        const originalCheckboxes = originalList.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        
        // Sync functionality between cloned and original checkboxes
        clonedCheckboxes.forEach((clonedCheckbox, index) => {
            const originalCheckbox = originalCheckboxes[index];
            if (originalCheckbox) {
                // Copy the checked state
                clonedCheckbox.checked = originalCheckbox.checked;
                
                // Add event listener to cloned checkbox that triggers the original
                clonedCheckbox.addEventListener('change', function() {
                    // Update the original checkbox
                    originalCheckbox.checked = this.checked;
                    
                    // Trigger the original checkbox's change event
                    const event = new Event('change', { bubbles: true });
                    originalCheckbox.dispatchEvent(event);
                    
                    console.log('🔄 Layer checkbox toggled:', this.checked, 'for layer:', this.name || this.id);
                });
                
                // Add click event listener to the label
                const clonedLabel = clonedCheckbox.parentElement;
                if (clonedLabel && clonedLabel.tagName === 'LABEL') {
                    clonedLabel.addEventListener('click', function(e) {
                        // Prevent default to handle manually
                        e.preventDefault();
                        
                        // Toggle the checkbox
                        clonedCheckbox.checked = !clonedCheckbox.checked;
                        
                        // Trigger change event
                        const changeEvent = new Event('change', { bubbles: true });
                        clonedCheckbox.dispatchEvent(changeEvent);
                    });
                }
            }
        });
    }

    toggleSection(sectionElement) {
        const content = sectionElement.querySelector('.enhanced-content');
        const arrow = sectionElement.querySelector('.enhanced-arrow');
        const isOpen = content.style.display === 'block';
        
        // Close all sections first
        document.querySelectorAll('.enhanced-content').forEach(content => {
            content.style.display = 'none';
        });
        
        document.querySelectorAll('.enhanced-arrow').forEach(arrow => {
            arrow.style.transform = 'rotate(0deg)';
        });
        
        // Open clicked section if it was closed
        if (!isOpen) {
            content.style.display = 'block';
            arrow.style.transform = 'rotate(180deg)';
        }
        
        console.log('🔄 Enhanced Layer Control: Toggled section:', sectionElement.id);
    }
}

// Initialize enhanced layer control
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Enhanced Layer Control: Starting initialization...');
    window.enhancedLayerControl = new EnhancedLayerControl();
});

// Global debug function
window.debugEnhancedControl = function() {
    console.log('🔍 Enhanced Layer Control Debug:');
    console.log('- Original control:', document.querySelector('.leaflet-control-layers'));
    console.log('- Enhanced control:', document.querySelector('.enhanced-layer-control'));
    console.log('- Accordion sections:', document.querySelectorAll('.enhanced-section'));
    console.log('- Layer lists:', document.querySelectorAll('.leaflet-control-layers-overlays'));
    console.log('- Checkboxes:', document.querySelectorAll('.enhanced-content input[type="checkbox"]'));
}; 