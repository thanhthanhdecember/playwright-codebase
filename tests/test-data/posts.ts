import { AddPost } from "../pages/AdminPage"

const today = new Date().toLocaleDateString('vi-VN',{
    day: '2-digit',
    month: '2-digit'
})

export const urlPost = {
    allPosts: /\/wp-admin\/edit\.php/,
    addPost: /\/wp-admin\/post-new\.php/,
    categories: /\/wp-admin\/edit-tags\.php\?taxonomy\=category/,
    tags: /\/wp-admin\/edit-tags\.php\?taxonomy\=post\_tag/,
}

export const searchPost = 'Amily'

export const newPost = {
    title: `Playwrigh (Amily) ${today}`,
    document: 'Full-featured test runner with auto-waiting, assertions, tracing, and parallelism across Chromium, Firefox, and WebKit.'
}

export const editPost = {
    title: `Edit Playwrigh (Amily) ${today}`,
    document: 'Edit Full-featured test runner with auto-waiting, assertions, tracing, and parallelism across Chromium, Firefox, and WebKit.'
}


export const dataSearchCategory = 'API Testing'


export const dataAddCategory =  {
    name: `Amily ${today}`,
    slug: 'amily',
    parent: '10284',
    descrition: 'Playwright Test'
}

export const dataEditCategory =  {
    name: `Edit Amily ${today}`,
    slug: 'amilyedit',
    parent: '10313',
    descrition: 'Edit Playwright Test'
}

export const dataAddTag = {
    name: `Tag Amily ${today}`,
    slug: 'amilytag',
    descrition: 'Add Tag'
}

export const dataEditTag = {
    name: `Edit Tag Amily ${today}`,
    slug: 'amilytagedit',
    descrition: 'Edit Add Tag'
}
