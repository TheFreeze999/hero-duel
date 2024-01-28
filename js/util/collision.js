export function collisionRectRect(pos1, size1, pos2, size2) {
    return (((pos1.x + size1.x / 2 >= pos2.x - size2.x / 2) && (pos1.x - size1.x / 2 <= pos2.x + size2.x / 2))
        &&
            ((pos1.y + size1.y / 2 >= pos2.y - size2.y / 2) && (pos1.y - size1.y / 2 <= pos2.y + size2.y / 2)));
}
