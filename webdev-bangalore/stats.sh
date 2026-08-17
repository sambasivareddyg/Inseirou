docker stats --no-stream --format '{{.CPUPerc}}\t{{.MemUsage}}' $(docker compose ps -q) | \
awk '{
    cpu += $1;
    val = $2;
    if ($2 ~ /GiB|GB/)         mem += val * 1024;
    else if ($2 ~ /MiB|MB/)    mem += val;
    else if ($2 ~ /KiB|kB|KB/) mem += val / 1024;
    else if ($2 ~ /B/)         mem += val / (1024 * 1024);
} 
END {
    printf "Stack Total CPU: %.2f%%\nStack Total RAM: %.2f MiB (%.2f GiB)\n", cpu, mem, mem/1024
}'

