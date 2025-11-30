/**
 * GPT Partei - Zentrales JavaScript
 * Handles: Navigation, Tabs, Toggles, Smooth Scroll
 * Version: 2.0 (Refactored)
 */

// ========================================
// 1. NAVIGATION TOGGLE (Mobile)
// ========================================

function initNavToggle() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;
    
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const isOpen = navLinks.classList.contains('open');
        navToggle.setAttribute('aria-expanded', isOpen);
        navToggle.setAttribute('aria-label', isOpen ? 'Navigation schließen' : 'Navigation öffnen');
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ========================================
// 2. TAB SYSTEM (Generic)
// ========================================

function initTabs(container = document) {
    const tabContainers = container.querySelectorAll('.tabs');
    
    tabContainers.forEach(tabContainer => {
        const tabs = tabContainer.querySelectorAll('.tab');
        const contentContainer = tabContainer.nextElementSibling;
        
        if (!contentContainer) return;
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active from all tabs
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                
                // Hide all content
                const contents = contentContainer.querySelectorAll('.tab-content');
                contents.forEach(c => c.classList.remove('active'));
                
                // Activate clicked tab
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                
                // Show corresponding content
                const contentId = tab.getAttribute('data-content') || `content-${index + 1}`;
                const content = document.getElementById(contentId);
                if (content) {
                    content.classList.add('active');
                }
            });
            
            // Keyboard support
            tab.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    tab.click();
                }
            });
        });
    });
}

// ========================================
// 3. PHASE TABS (Finanzierung)
// ========================================

function initPhaseTabs() {
    const phaseTabs = document.querySelectorAll('.phase-tab');
    const phaseContents = document.querySelectorAll('.phase-content');
    
    phaseTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Remove active from all
            phaseTabs.forEach(t => t.classList.remove('active'));
            phaseContents.forEach(c => c.classList.remove('active'));
            
            // Activate clicked
            tab.classList.add('active');
            phaseContents[index]?.classList.add('active');
        });
    });
}

// Alternative: Mit ID-basierter Steuerung
function switchPhase(phaseId) {
    // Deactivate all
    document.querySelectorAll('.phase-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.phase-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Activate selected
    const selectedTab = document.querySelector(`.phase-tab[onclick*="${phaseId}"]`);
    const selectedContent = document.getElementById(`phase-${phaseId}`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedContent) selectedContent.classList.add('active');
}

// ========================================
// 4. PUNKT NAVIGATION (Parteipunkte Detail)
// ========================================

function initPunktNav() {
    const punktNavItems = document.querySelectorAll('.punkt-nav-item');
    const detailCards = document.querySelectorAll('.detail-card');
    
    punktNavItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            showPunkt(index + 1);
        });
        
        // Keyboard support
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showPunkt(index + 1);
            }
        });
        
        // Make focusable
        if (!item.hasAttribute('tabindex')) {
            item.setAttribute('tabindex', '0');
        }
    });
}

function showPunkt(nummer) {
    // Hide all cards
    document.querySelectorAll('.detail-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Deactivate all nav items
    document.querySelectorAll('.punkt-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected card
    const selectedCard = document.getElementById(`punkt-${nummer}`);
    if (selectedCard) {
        selectedCard.classList.add('active');
        
        // Activate corresponding nav item
        const navItems = document.querySelectorAll('.punkt-nav-item');
        if (navItems[nummer - 1]) {
            navItems[nummer - 1].classList.add('active');
        }
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ========================================
// 5. DETAIL TOGGLE (Finanzierung Rows)
// ========================================

function initDetailToggles() {
    const costRows = document.querySelectorAll('.cost-row');
    
    costRows.forEach(row => {
        // Skip header and total rows
        if (row.classList.contains('header') || row.classList.contains('total')) {
            return;
        }
        
        row.addEventListener('click', () => {
            toggleDetail(row);
        });
        
        // Keyboard support
        row.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDetail(row);
            }
        });
        
        // Make focusable
        if (!row.hasAttribute('tabindex')) {
            row.setAttribute('tabindex', '0');
        }
        
        // ARIA
        row.setAttribute('role', 'button');
        row.setAttribute('aria-expanded', 'false');
    });
}

function toggleDetail(row) {
    const isExpanded = row.classList.contains('expanded');
    const detail = row.nextElementSibling;
    
    // Close all other expanded rows
    document.querySelectorAll('.cost-row.expanded').forEach(r => {
        if (r !== row) {
            r.classList.remove('expanded');
            r.setAttribute('aria-expanded', 'false');
            const d = r.nextElementSibling;
            if (d?.classList.contains('detail-content')) {
                d.classList.remove('show');
            }
        }
    });
    
    // Toggle this row
    if (!isExpanded) {
        row.classList.add('expanded');
        row.setAttribute('aria-expanded', 'true');
        if (detail?.classList.contains('detail-content')) {
            detail.classList.add('show');
        }
    } else {
        row.classList.remove('expanded');
        row.setAttribute('aria-expanded', 'false');
        if (detail?.classList.contains('detail-content')) {
            detail.classList.remove('show');
        }
    }
}

// ========================================
// 6. SMOOTH SCROLL TO ANCHORS
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('nav')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });
}

// ========================================
// 7. DYNAMIC TABLE RENDERING (Finanzierung)
// ========================================

function renderTable(containerId, data, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = `
        <div class="cost-row header">
            <div>Maßnahme</div>
            <div style="text-align: right;">Betrag/Jahr</div>
        </div>
    `;
    
    let total = 0;
    
    data.forEach((item, index) => {
        const amount = item.cost || item.amount;
        total += amount;
        
        html += `
            <div class="cost-row" tabindex="0" role="button" aria-expanded="false">
                <div class="cost-category">
                    <span>${item.name} <span class="expand-icon">▸</span></span>
                </div>
                <div class="cost-amount ${type}">${amount} Mrd. €</div>
            </div>
            <div class="detail-content">
                <h4>${item.name}</h4>
                <p>${item.detail}</p>
            </div>
        `;
    });
    
    html += `
        <div class="cost-row total">
            <div>Gesamt</div>
            <div class="cost-amount ${type}">${total} Mrd. €</div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Re-initialize toggles for newly rendered content
    initDetailToggles();
}

// ========================================
// 8. LOGO CLICK HANDLER
// ========================================

function initLogoClick() {
    const logo = document.querySelector('.logo-nav');
    if (!logo) return;
    
    logo.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // Keyboard support
    logo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.location.href = 'index.html';
        }
    });
    
    // Make focusable if it's not a link
    if (logo.tagName !== 'A' && !logo.hasAttribute('tabindex')) {
        logo.setAttribute('tabindex', '0');
        logo.setAttribute('role', 'link');
    }
}

// ========================================
// 9. ACTIVE NAV LINK
// ========================================

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

// ========================================
// 10. INITIALIZATION
// ========================================

function initAll() {
    // Core functionality
    initNavToggle();
    initLogoClick();
    setActiveNavLink();
    initSmoothScroll();
    
    // Page-specific functionality
    initTabs();
    initPhaseTabs();
    initPunktNav();
    initDetailToggles();
    
    console.log('✓ GPT Partei - All scripts initialized');
}

// ========================================
// 11. EVENT LISTENERS
// ========================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

// Handle window resize (debounced)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            const navToggle = document.querySelector('.nav-toggle');
            if (navLinks?.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle?.setAttribute('aria-expanded', 'false');
            }
        }
    }, 250);
});

// ========================================
// 12. EXPORTS (for potential module use)
// ========================================

// If using as ES6 module, export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showPunkt,
        switchPhase,
        toggleDetail,
        renderTable,
        initAll
    };
}
