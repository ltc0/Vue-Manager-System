 <template>
  <div class="f-menu" :style="{width:store.asideWidth}">
    <el-menu
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="defaultActive"
      @select="handleSelect"
      class="el-menu-vertical-demo"
    >
      <template 
      v-for="(item, index) in asideMenu" 
      :key="index"
      >
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <!-- 这里用来存放一级菜单 -->
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
            
          >
            <el-icon>
              <component :is="item2.icon" />
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- 当没有child的时候只显示一级菜单 -->
        <el-menu-item v-else :index="item.frontpath"
        >
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import {useRouter,useRoute} from "vue-router"
import { computed,ref } from 'vue';
import useStore from "../../store";
import { arrowMiddleware } from "element-plus";

const router = useRouter()
const route = useRoute()

//默认选中
const defaultActive = ref(route.path)

const store = useStore();

//computed的坑，加了{}要使用return，而不加{}就不需要return
const asideMenu = computed(() =>  {
  return store.user.menus})

const handleSelect = (e)=>{
  router.push(e);
}
//是否折叠
const isCollapse = computed(() => 
  !(store.asideWidth == '250px')
)

const aa = (e) => {
  console.log(e)
}
</script>

 <style scoped>
.f-menu {
  transition: all 0.2s;
  position: fixed;
  top: 64px;
  bottom: 0;
  left: 0;
  background: lightsteelblue;
  overflow-y: auto;
  overflow-x: hidden;
  border: 0;
}
</style>>
