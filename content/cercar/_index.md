+++
title = "Cercador"
date = 2026-04-01
draft = false
+++

## Cerca al web

<form id="search-form" class="search-form">
  <input type="text" id="search-input" placeholder="Escriu per cercar..." autocomplete="off">
  <button type="submit">Cercar</button>
</form>

<div id="search-results"></div>

<script>
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

const pages = [
{{ range where site.RegularPages "Section" "!=" "" }}
  { title: "{{ .Title }}", url: "{{ .RelPermalink }}", section: "{{ .Section }}", excerpt: "{{ .Summary | truncate 100 }}" },
{{ end }}
];

searchInput.addEventListener('input', function(e) {
  const query = e.target.value.toLowerCase().trim();
  searchResults.innerHTML = '';
  
  if (query.length < 2) return;
  
  const results = pages.filter(page => 
    page.title.toLowerCase().includes(query) || 
    page.excerpt.toLowerCase().includes(query)
  );
  
  if (results.length === 0) {
    searchResults.innerHTML = '<p>No s\'han trobat resultats per a "<strong>' + query + '</strong>"</p>';
    return;
  }
  
  searchResults.innerHTML = '<p><strong>' + results.length + '</strong> resultat(s) trobat(s):</p><ul class="search-list">';
  results.forEach(page => {
    searchResults.innerHTML += '<li><a href="' + page.url + '"><strong>' + page.title + '</strong></a><p>' + page.excerpt + '</p></li>';
  });
  searchResults.innerHTML += '</ul>';
});
</script>

<style>
.search-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-form input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.search-form button {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.search-form button:hover {
  background: var(--color-accent);
}

.search-list {
  list-style: none;
}

.search-list li {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

.search-list li:last-child {
  border-bottom: none;
}

.search-list a {
  color: var(--color-primary);
  font-weight: 600;
}

.search-list a:hover {
  color: var(--color-accent);
}

.search-list p {
  color: var(--color-secondary);
  margin-top: 0.5rem;
}
</style>
