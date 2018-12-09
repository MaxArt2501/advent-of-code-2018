const codes = input.split(' ').map(Number);

function buildTree(start) {
  const childNodesCount = codes[start];
  const metadataCount = codes[start + 1];

  const children = new Array(childNodesCount);
  let pointer = start + 2;
  for (let i = 0; i < childNodesCount; i++) {
    children[i] = buildTree(pointer);
    pointer = children[i].next;
  }

  const next = pointer + metadataCount;
  const metadata = codes.slice(pointer, next);

  return {
    children,
    metadata,
    next
  };
}

/**
 * A (rather) simple tree-walking function to sum the values of all the nodes.
 * @param {object} node
 */
function getNodeValue(node) {
  if (node.children.length === 0) {
    return node.metadata.reduce((sum, value) => sum + value, 0);
  }

  return node.metadata.reduce((sum, index) => {
    const value = index > node.children.length ? 0 : getNodeValue(node.children[index - 1]);
    return sum + value;
  }, 0);
}

getNodeValue(buildTree(0));
