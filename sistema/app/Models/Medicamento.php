<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['categoria_id', 'name', 'price', 'stock'])]

class Medicamento extends Model
{
    protected function casts(): array
{
return [
'price' => 'decimal:2',
'stock' => 'integer',
];
}
public function categoria(): BelongsTo
{
return $this->belongsTo(Categoria::class);
}
public function detallesVenta(): HasMany
{
return $this->hasMany(DetalleVenta::class);
}
// Método del diagrama: +actualizarStock(): void
public function actualizarStock(int $cantidad): void
{
$this->decrement('stock', $cantidad);
}

}
