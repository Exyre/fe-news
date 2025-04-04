/**
 * Equalizes the heights of article cards in each row by adjusting image heights
 * This function uses the ResizeObserver API to detect when cards change size
 * and only applies when there are multiple columns
 */
export const equalizeArticleCardHeights = () => {
  const equalizeHeights = () => {
    const container = document.querySelector('.article-cards');
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.article-card'));
    cards.forEach(card => {
      const img = card.querySelector('img');
      if (img) img.style.height = '';
    });
    
    const containerWidth = container.clientWidth;
    if (cards.length === 0) return;

    const firstCard = cards[0];
    const cardStyle = window.getComputedStyle(firstCard);
    const cardWidth = firstCard.offsetWidth + 
                      parseInt(cardStyle.marginLeft || 0) + 
                      parseInt(cardStyle.marginRight || 0);

    const gap = 30; 
    const cardsPerRow = Math.floor((containerWidth + gap) / (cardWidth + gap));

    if (cardsPerRow <= 1) return;

    for (let i = 0; i < cards.length; i += cardsPerRow) {
      const rowCards = cards.slice(i, i + cardsPerRow);

      const maxHeight = Math.max(...rowCards.map(card => card.scrollHeight));

      rowCards.forEach(card => {
        const currentHeight = card.scrollHeight;
        const img = card.querySelector('img');
        
        if (img && currentHeight < maxHeight) {
          const heightDifference = maxHeight - currentHeight;
          const currentImgHeight = parseInt(window.getComputedStyle(img).height);
          const newImgHeight = currentImgHeight + heightDifference;

          img.style.height = `${newImgHeight}px`;
        }
      });
    }
  };


  equalizeHeights();

  window.addEventListener('resize', equalizeHeights);
  
  if (typeof ResizeObserver !== 'undefined') {
    const resizeObserver = new ResizeObserver(equalizeHeights);
    const container = document.querySelector('.article-cards');
    if (container) {
      resizeObserver.observe(container);
    }
  }
  return () => {
    window.removeEventListener('resize', equalizeHeights);
  };
}; 