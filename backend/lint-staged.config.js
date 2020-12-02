module.exports = {
    '*.{js,ts,tsx,jsx}': [
        'eslint --fix',
        'prettier --write',
        //'jest --findRelatedTests',
        'git add',
    ],
    '*.{md,css,sass,yml,yaml,scss,json,html}': ['prettier --write', 'git add'],
};
