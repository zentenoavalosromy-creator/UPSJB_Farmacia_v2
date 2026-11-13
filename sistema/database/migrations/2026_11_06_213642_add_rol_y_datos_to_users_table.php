<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('rol_id')->after('id') ->constrained('roles')->restrictOnDelete();
            $table->char('dni', 8)->unique()->after('name');
            $table->string('phone', 15)->nullable()->after('dni');
            $table->string('tuition', 20)->nullable()->after('phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('rol_id');
            $table->dropUnique(['dni']);
            $table->dropColumn(['dni', 'phone', 'tuition']);
        });
    }
};
