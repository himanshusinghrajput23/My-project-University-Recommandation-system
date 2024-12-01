document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('collegeTableBody');
    let filters = {
        location: '',
        maxFees: '',
        program: '',
        minRank: ''
    };

    function filterUniversities(universities) {
        return universities.filter(university => {
            if (filters.location && !university.location.toLowerCase().includes(filters.location.toLowerCase())) {
                return false;
            }
            if (filters.maxFees && university.fees.btech > Number(filters.maxFees)) {
                return false;
            }
            if (filters.program && !university.programs.some(prog => 
                prog.toLowerCase().includes(filters.program.toLowerCase()))) {
                return false;
            }
            if (filters.minRank && university.nirf_rank > Number(filters.minRank)) {
                return false;
            }
            return true;
        });
    }

    function renderTable() {
        const filteredUniversities = filterUniversities(universities);
        tableBody.innerHTML = '';

        filteredUniversities.forEach(university => {
            // Main row
            const row = document.createElement('tr');
            row.className = 'college-row';
            row.innerHTML = `
                <td>
                    <div class="college-info">
                        <img src="${university.imageUrl}" alt="${university.name}" class="college-image">
                        <div>
                            <div style="font-weight: 500">${university.name}</div>
                            <div style="color: #6b7280; font-size: 0.875rem">Est. ${university.established}</div>
                        </div>
                    </div>
                </td>
                <td>${university.location}</td>
                <td>#${university.nirf_rank}</td>
                <td>₹${university.fees.btech.toLocaleString()}</td>
                <td>${university.programs.length} Programs</td>
                <td>Cutoff: ${university.cutoff}%</td>
            `;

            // Details row
            const detailsRow = document.createElement('tr');
            detailsRow.className = 'details-row';
            detailsRow.innerHTML = `
                <td colspan="6">
                    <div class="details-content">
                        <div class="details-section">
                            <h4>All Programs</h4>
                            <ul class="program-list">
                                ${university.programs.map(program => `<li>${program}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="details-section">
                            <h4>Detailed Fees Structure</h4>
                            <div class="fees-list">
                                <div class="fees-item">B.Tech: ₹${university.fees.btech.toLocaleString()}/year</div>
                                <div class="fees-item">M.Tech: ₹${university.fees.mtech.toLocaleString()}/year</div>
                            </div>
                        </div>
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
            tableBody.appendChild(detailsRow);

            row.addEventListener('click', () => {
                detailsRow.classList.toggle('active');
            });
        });
    }

    // Set up filter listeners
    document.getElementById('location').addEventListener('input', (e) => {
        filters.location = e.target.value;
        renderTable();
    });

    document.getElementById('maxFees').addEventListener('input', (e) => {
        filters.maxFees = e.target.value;
        renderTable();
    });

    document.getElementById('program').addEventListener('input', (e) => {
        filters.program = e.target.value;
        renderTable();
    });

    document.getElementById('minRank').addEventListener('input', (e) => {
        filters.minRank = e.target.value;
        renderTable();
    });

    // Initial render
    renderTable();
});