<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>{{ url('/') }}</loc>
        <lastmod>{{ now()->format('c') }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>

    @foreach($categories as $category)
    <url>
        <loc>{{ url('/category/' . $category->slug) }}</loc>
        <lastmod>{{ $category->updated_at ? $category->updated_at->format('c') : now()->format('c') }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    @endforeach
    @foreach($subcategories as $subcategory)
    <url>
        <loc>{{ url('/subcategory/' . $subcategory->slug) }}</loc>
        <lastmod>{{ $subcategory->updated_at ? $subcategory->updated_at->format('c') : now()->format('c') }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    @endforeach

    @foreach($subSubcategories as $subSubcategory)
    <url>
        <loc>{{ url('/products/' . $subSubcategory->slug) }}</loc>
        <lastmod>{{ $subSubcategory->updated_at ? $subSubcategory->updated_at->format('c') : now()->format('c') }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    @endforeach

    @foreach($products as $product)
    <url>
        <loc>{{ url('/product/' . $product->slug) }}</loc>
        <lastmod>{{ $product->updated_at ? $product->updated_at->format('c') : now()->format('c') }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
    </url>
    @endforeach
</urlset>
