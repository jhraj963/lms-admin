<template>
    <footer class="footer py-4  ">
        <div class="container-fluid">
            <div class="row align-items-center justify-content-lg-between">
                <div class="col-lg-4 mb-lg-0 mb-4">
                    <div class="copyright text-center text-sm text-muted text-lg-start">
                        made with <i class="fa fa-heart"></i> by
                        <a href="/" class="font-weight-bold" target="_blank">JHR</a>
                        for a better web.
                    </div>
                </div>
                <div class="col-lg-3">
                    <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                        <li class="nav-item">
                            <a href="https://www.creative-tim.com" class="nav-link text-muted"
                                target="_blank">Distributed By: LMS</a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    props: {
        msg: String
    }
}
</script>