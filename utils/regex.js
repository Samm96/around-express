const regex = /(^http|https)?:\/\/(^w{3}\.)?\S{1,}\.([a-z]{3})\/(\S{1,})?/;


// /(^http|https)?:\/\/?(w{3}\.)?\S{1,}\.([a-z]{3})?(\S{1,})/

// /(^http|https)?:\/\/?(w{3}\.)?\S{1,}\.[a-z]{3}/

// /(^http|https)?:\/\/?(^www\.)?\S{1,}\.[a-z]{3}?\/\S{1,}/;

module.exports = {
  regex
}