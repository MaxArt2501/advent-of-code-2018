const codes = input.split(' ').map(Number);

/**
 * This function is the real core of this puzzle. The rest is quire trivial, to
 * be honest.
 * The trick here is to return a node that, among its properties, keeps track of
 * the index to the next sibling node.
 * @param {number} start The starting index
 */
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
 * A simple tree-walking function to collect the sums of the metadata.
 * @param {object} node
 */
function sumMetadata(node) {
  const metadataSum = node.metadata.reduce((sum, value) => sum + value, 0);
  const childrenSum = node.children.reduce((sum, child) => sum + sumMetadata(child), 0);
  return metadataSum + childrenSum;
}

sumMetadata(buildTree(0));
