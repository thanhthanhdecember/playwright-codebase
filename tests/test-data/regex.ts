export const regexData = {
    // Cho thẻ <p class="load-more-count">Showing 80 of 153 media items</p>
    loadMoreCount: /Showing\s+(\d+)/i,

    // Cho thẻ <span class="displaying-num">40 items</span>
    displayingNum: /(\d+)\s+items/i,

    // Regex fallback: Lấy nhóm chữ số đầu tiên tìm thấy
    defaulDigits: /(\d+)/
}